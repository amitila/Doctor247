// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDAn-sFUCPtPjJImNtFB4xtRhGTpbmF-8c",
//   authDomain: "chat-docter247.firebaseapp.com",
//   projectId: "chat-docter247",
//   storageBucket: "chat-docter247.appspot.com",
//   messagingSenderId: "808513633549",
//   appId: "1:808513633549:web:a970e6ffa85d96f9eb8444",
//   measurementId: "G-BFWK5MM886"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBDWZcUa06wmavlixK3EowB2yCLpcY42Is",
  authDomain: "phoneverify-db763.firebaseapp.com",
  databaseURL: "https://phoneverify-db763.firebaseio.com",
  projectId: "phoneverify-db763",
  storageBucket: "phoneverify-db763.appspot.com",
  messagingSenderId: "565311308222",
  appId: "1:565311308222:web:5fc82a97c0d23b10e879ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth();
const db = getFirestore();

connectFirestoreEmulator(db, 'localhost', 8088);

export {auth, db, app};

//npm install --save antd @ant-design/icons date-fns firebase lodash react-router-dom styled-components
