// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO-7uh6a6G9Qbte2sxehET3vlG2rHq5hg",
  authDomain: "cats-ef503.firebaseapp.com",
  projectId: "cats-ef503",
  storageBucket: "cats-ef503.appspot.com",
  messagingSenderId: "117059794994",
  appId: "1:117059794994:web:017fca316a5a97a911642b",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export { firebase };
