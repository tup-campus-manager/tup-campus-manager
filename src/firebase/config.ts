import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBCMc5yvmMMrqindnQxG0NT4Gv7_fsMCAY",
  authDomain: "campus-manager-db0c4.firebaseapp.com",
  projectId: "campus-manager-db0c4",
  storageBucket: "campus-manager-db0c4.firebasestorage.app",
  messagingSenderId: "762321296960",
  appId: "1:762321296960:web:5376ff2cc529c1de2789a5",
  measurementId: "G-FCELEBJN9G"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()