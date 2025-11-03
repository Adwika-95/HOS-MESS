// ✅ src/config/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAWHaoY4fwunTIx7u6-QxAwI4eFUCAbit0",
  authDomain: "hos-mess.firebaseapp.com",
  projectId: "hos-mess",
  storageBucket: "hos-mess.firebasestorage.app",
  messagingSenderId: "106816714519",
  appId: "1:106816714519:web:6dbe59a3d34df6c1b1a952",
  measurementId: "G-50GQBL5R2T"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
