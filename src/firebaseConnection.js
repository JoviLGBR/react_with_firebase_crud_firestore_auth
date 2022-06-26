// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig = {
  apiKey: "AIzaSyBzgBJASrYftcUgtM5VWLg-th0KnefZucY",
  authDomain: "curso-react-3052.firebaseapp.com",
  projectId: "curso-react-3052",
  storageBucket: "curso-react-3052.appspot.com",
  messagingSenderId: "333890286235",
  appId: "1:333890286235:web:4b67220a0e0ed022398c3e",
  measurementId: "G-X0Y5JQ6VKJ"
};

// Initialize Firebase
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;