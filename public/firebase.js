import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js"

const firebaseConfig = {
    apiKey: "AIzaSyD5wqJ_nlrzdfoWp2Jf3m3HoG5RWqnDjzc",
    authDomain: "major-project-e45a6.firebaseapp.com",
    projectId: "major-project-e45a6",
    storageBucket: "major-project-e45a6.appspot.com",
    messagingSenderId: "411998827428",
    appId: "1:411998827428:web:71a1be3d84a419c071c731",
    measurementId: "G-N5LLDHQTW4"
};
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
console.log("App", app);
const auth = getAuth();
console.log("Auth", auth)

const loginButton = document.getElementById("loginButton");

loginButton.onclick = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user)
            window.open("/main","_self")
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}

