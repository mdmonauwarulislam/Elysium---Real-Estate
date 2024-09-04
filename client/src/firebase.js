// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "elysium-real-estate-7cca3.firebaseapp.com",
  projectId: "elysium-real-estate-7cca3",
  storageBucket: "elysium-real-estate-7cca3.appspot.com",
  messagingSenderId: "639419586664",
  appId: "1:639419586664:web:3cff71a2df97cea59f43dd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);