const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const port = 80;
const dotenv = require('dotenv');
dotenv.config();

const {initializeApp } = require("firebase/app");
const {getAnalytics } = require("firebase/analytics");


const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain:process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
};
// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// mongoose.connect('mongodb://localhost:27017/rana', {useNewUrlParser: true, useUnifiedTopology: true});
const app = express();
app.engine('handlebars', exphbs(
  {
    extname: "handlebars",
    //defaultLayout: "main-layout",
    layoutsDir: "views/"
  }
));
app.set('view engine', 'handlebars');

// Static folder
app.use(express.static('public'))
//       app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// ----------------------------------firestore----------------------------------------------------------
// var admin = require("firebase-admin");
// var serviceAccount = require("./serviceAccountKey.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
// const db = admin.firestore();
// let User = db.collection("users");

// User.get().then((querySnapshot) => {
//   querySnapshot.forEach(document => {
//     console.log(document.data());
//   })
// })

// const batch = db.batch();
// const user3 = db.collection("users").doc("3");
// batch.set(user3 ,{id : 3,name: " user3"});
// batch.commit().then(res =>{
// console.log("Batch ran successfully");
// });  

// app.post('/send', (req, res) => {
//    const user3 = db.collection("users").doc("3");
//   const User = new user({
//       name: req.body.name,
//       company: req.body.company,
//   });
// batch.set(user3 ,{name :req.body.name , company :req.body.company});
// batch.commit().then(res =>{
// console.log("Batch ran successfully");
// });
//   post.save();
//   res.redirect("/");
// });
// -----------------------------------------------------------------------------------------------------
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
})

app.get('/main', (req, res) => {
  res.render('main', { layout: false });
});

app.get('/response', (req, res) => {
  res.render('response.handlebars', { layout: false });
});

app.post('/send', (req, res) => {
  const output = `
                  <p>You have a new contact request</p>
                  <h3>Contact Details</h3>
                  <ul>  
                    <li>Name: ${req.body.name}</li>
                    <li>Email: ${req.body.email}</li>
                    <li>Project: ${req.body.project}</li>
                    <li>Coordinator: ${req.body.coordinator}</li>
                  </ul>
                  <h3>Message</h3>
                  <p>${req.body.message}</p>
                `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.USER_ID,
      pass: process.env.USER_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '<martinarawal@gmail.com>', // sender address
    to: 'adityarana95488459@gmail.com',// list of receivers
    subject: 'New Project Request', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.redirect('/response');
  });
});

console.log(`The application started successfully on port ${port}`);
app.listen(process.env.PORT || port, () => {
});