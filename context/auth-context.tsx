import { useState, useEffect, useContext, createContext } from "react";
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fSignOut,
  sendPasswordResetEmail as fSendPasswordResetEmail,
  confirmPasswordReset as fConfirmPasswordReset,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";

import { config } from "./firebase";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuthProvider = () => {
  let firebaseApp;
  if (!getApps().length) {
    firebaseApp = initializeApp(config);
  }
  const auth = getAuth(firebaseApp);

  const db = getFirestore(firebaseApp);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email, password) => {

    const usersRef = collection(db, "users");

    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await addDoc(usersRef, { // adds new user to 'users' collection
      uuid: response.user.uid,
      timestamp: Timestamp.now(),
      email,
    });
  };

  const signOut = async () => {
    await fSignOut(auth);
  };

  const sendPasswordResetEmail = async (email) => {
    await fSendPasswordResetEmail(auth, email);
  };

  const confirmPasswordReset = async (password, oobCode) => {
    await fConfirmPasswordReset(auth, oobCode, password);
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
};
