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
    FacebookAuthProvider,
    
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

console.log(import.meta.env.VITE_SOME_apiKey);


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
auth.languageCode = "it";
auth.appVerificationDisabledForTesting = true;


export {
    auth,
    googleProvider,
    facebookProvider,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    sendEmailVerification,
  };