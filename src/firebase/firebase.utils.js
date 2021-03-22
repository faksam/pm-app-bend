import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBeAIaAlZ_xD7zV0tuVPVeCnkX2JTz3YXY",
  authDomain: "pmapp-c014b.firebaseapp.com",
  projectId: "pmapp-c014b",
  storageBucket: "pmapp-c014b.appspot.com",
  messagingSenderId: "175487366865",
  appId: "1:175487366865:web:b5230cf1307dcf4dc8f7f0",
  measurementId: "G-3KC8RVLBHE"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
