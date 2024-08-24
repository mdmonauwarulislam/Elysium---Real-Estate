// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
//   apiKey: "AIzaSyAv2qiSWmaFiaeucJia6_sAOouT2lu_nVY",
apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-state-9c5cd.firebaseapp.com",
  projectId: "real-state-9c5cd",
  storageBucket: "real-state-9c5cd.appspot.com",
  messagingSenderId: "426948857932",
  appId: "1:426948857932:web:f94bdc00bd07d7f7ba24e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);