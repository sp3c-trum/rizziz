import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";

//Templatka do wykorzystania, póki co system logowań i użytkowników jeszcze w dalekiej przyszłości jest dopiero

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const addQuestion = async (questionText, answers, correctAnswer, timeLimit, category) => {
    try {
      await addDoc(collection(db, "questions"), {
        questionText,
        answers,
        correctAnswer,
        timeLimit,
        category,
      });
    } catch (error) {
      console.error("Nie dodano pytania: ", error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "questions"));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Nie udało się pobrać pytań: ", error);
      return [];
    }
  };

  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "categories"));
      return querySnapshot.docs.map(doc => doc.data().name);
    } catch (error) {
      console.error("Nie udało się pobrać kategorii: ", error);
      return [];
    }
  };
  
  const addCategory = async (categoryName) => {
    try {
      await addDoc(collection(db, "categories"), {
        name: categoryName
      });
    } catch (error) {
      console.error("Nie dodano kategorii: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, addQuestion, fetchQuestions, fetchCategories, addCategory }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
