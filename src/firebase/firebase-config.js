import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCK1t7AiL-SS5VdzZlfe6dGHV8ok9nWUYM",
  authDomain: "react-auth-98d04.firebaseapp.com",
  projectId: "react-auth-98d04",
  storageBucket: "react-auth-98d04.appspot.com",
  messagingSenderId: "297546975043",
  appId: "1:297546975043:web:00ca9fedcb940902dc51f6",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

const googleAuthProvider = new GoogleAuthProvider();

export { app, db, googleAuthProvider };
