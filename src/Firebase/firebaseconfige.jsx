import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    sendEmailVerification,
  } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_SOME_apiKey,
  authDomain: import.meta.env.VITE_SOME_authDomain,
  projectId: import.meta.env.VITE_SOME_projectId,
  storageBucket: import.meta.env.VITE_SOME_storageBucket,
  messagingSenderId: import.meta.env.VITE_SOME_messagingSenderId,
  appId: import.meta.env.VITE_SOME_appId,
  measurementId: import.meta.env.VITE_SOME_measurementId
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
auth.languageCode = "it";
auth.appVerificationDisabledForTesting = true;


export {
    auth,
    googleProvider,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    sendEmailVerification,
  };