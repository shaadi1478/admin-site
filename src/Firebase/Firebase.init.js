// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOkydkBlX3il3rJ54msGVdiJmJsjtsfPg",
  authDomain: "signin-86d74.firebaseapp.com",
  projectId: "signin-86d74",
  storageBucket: "signin-86d74.firebasestorage.app",
  messagingSenderId: "1009733070511",
  appId: "1:1009733070511:web:af076316965d23aad1ae5a",
  measurementId: "G-VDY4N66P96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth;
