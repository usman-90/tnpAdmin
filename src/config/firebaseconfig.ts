// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMRWXvn8-92jBwajde7RjByySM35MhzsU",
  authDomain: "tnpi-7d52d.firebaseapp.com",
  projectId: "tnpi-7d52d",
  storageBucket: "tnpi-7d52d.appspot.com",
  messagingSenderId: "207813132984",
  appId: "1:207813132984:web:c586c4361d9aff133dea4d",
  measurementId: "G-ZB8ET6ZDPK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
