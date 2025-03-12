import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCtRW-9J98cXMMfWNvExTQaq3DsL7IhkL0",
    authDomain: "fir-auth-59553.firebaseapp.com",
    projectId: "fir-auth-59553",
    storageBucket: "fir-auth-59553.firebasestorage.app",
    messagingSenderId: "683261367791",
    appId: "1:683261367791:web:87b889f6b035e5a537921a",
    measurementId: "G-XFHENZQW75"
  };
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };