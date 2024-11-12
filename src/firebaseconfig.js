// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqwX-LbIvnUTDOOR1cWB1cCRAwD_5FAP0",
  authDomain: "desadio-firebase2.firebaseapp.com",
  projectId: "desadio-firebase2",
  storageBucket: "desadio-firebase2.firebasestorage.app",
  messagingSenderId: "302575012078",
  appId: "1:302575012078:web:e0231dedda426ecbe64bff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;