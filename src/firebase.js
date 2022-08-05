import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "Your Key",
    authDomain: "Your Domain",
    projectId: "Your ID",
    storageBucket: "Your bucket",
    messagingSenderId: "Your messaging ID",
    appId: "Your App id",
    measurementId: "Your measuerment id",
  };

  
  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()

  export {auth, provider}
  export default db