import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBl1ZkNwROTnxwlRDRTs_R34IMZxmfg3PM",
  authDomain: "tudu-app-b14d9.firebaseapp.com",
  projectId: "tudu-app-b14d9",
  storageBucket: "tudu-app-b14d9.appspot.com",
  messagingSenderId: "165501775984",
  appId: "1:165501775984:web:e0b59a4058ba06afb304b5",
  measurementId: "G-MN1WZC4ZS5"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { app, auth, provider, storage, db };
