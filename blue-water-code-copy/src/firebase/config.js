// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV7q8CV6iyr1ObNYYfMRewoW113Zvb3Nk",
  authDomain: "bluewatershipping-10aa2.firebaseapp.com",
  projectId: "bluewatershipping-10aa2",
  storageBucket: "bluewatershipping-10aa2.firebasestorage.app",
  messagingSenderId: "606071320102",
  appId: "1:606071320102:web:04875fb9c469ed0d9fc0e7"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)