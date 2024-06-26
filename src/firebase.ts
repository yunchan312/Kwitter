// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoMInCgoQa2-69t9ddyStwLjPejx7D7Zw",
  authDomain: "kwitter-3b810.firebaseapp.com",
  projectId: "kwitter-3b810",
  storageBucket: "kwitter-3b810.appspot.com",
  messagingSenderId: "304309992042",
  appId: "1:304309992042:web:371845480fb1f934e3e813",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getFirestore(app);
