import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYP3NjYXCUuB2FgCT9XpS3rmQ5Fn5leMY",
  authDomain: "rizziz.firebaseapp.com",
  projectId: "rizziz",
  storageBucket: "rizziz.firebasestorage.app",
  messagingSenderId: "395831903690",
  appId: "1:395831903690:web:846b50ac36bdbc80d93b33"
}; //jak boga kocham weź ogranij te dane żeby nie świeciły tu całemu światu

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };