// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration (from Step 2)
const firebaseConfig = {
  apiKey: "AIzaSyATbPggZZpeYQdYMzw8z5u_aKxnNsszJH4",
  authDomain: "energy-monitoring-system-7795a.firebaseapp.com",
  projectId: "energy-monitoring-system-7795a",
  storageBucket: "energy-monitoring-system-7795a.appspot.com",
  messagingSenderId: "266167253548",
  appId: "1:266167253548:web:d53328f5ef700d0bdf6f89",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
