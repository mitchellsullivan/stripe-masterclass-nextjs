import firebaseAdmin from "firebase-admin";

try {
  firebaseAdmin.initializeApp();
} catch (e) {

}

export const db = firebaseAdmin.firestore();
export const auth = firebaseAdmin.auth();
