// firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAs4wSgzcJrlnu6KHz3Q0BAMtH58wCdfQM",
    authDomain: "businesscard-23c8b.firebaseapp.com",
    projectId: "businesscard-23c8b",
    storageBucket: "businesscard-23c8b.appspot.com",
    messagingSenderId: "502734400881",
    appId: "1:502734400881:web:50e8c2363cd3cdb222dad0",
    measurementId: "G-62B6BZDLME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

export { storage,app,auth };