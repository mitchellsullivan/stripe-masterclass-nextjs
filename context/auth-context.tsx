import {useState, useEffect, useContext, createContext, FC} from "react";
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
  Timestamp, setDoc, doc,
} from "firebase/firestore";

import { config } from "../firebase-config";
import firebase from "firebase/compat";
import App = firebase.app.App;

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: FC = ({ children }) => {
  const auth = useAuthProvider();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
};

export let FIREBASE_APP: App;

export const useAuthProvider = () => {
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

  const signUp = async (email, password, displayName) => {

    const usersRef = collection(db, "users");

    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // await addDoc(usersRef, {
    //   uuid: response.user.uid,
    //   timestamp: Timestamp.now(),
    //   email,
    //   displayName
    // });

    await setDoc(doc(db, "users", response.user.uid), {
        uuid: response.user.uid,
        timestamp: Timestamp.now(),
        email,
        displayName
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
