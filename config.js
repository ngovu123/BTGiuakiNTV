import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB8ZxlOPbrXy5J_mtjPihSALMCnNYybHBY",

  authDomain: "todoapp-c97cb.firebaseapp.com",

  projectId: "todoapp-c97cb",

  storageBucket: "todoapp-c97cb.appspot.com",

  messagingSenderId: "619288354313",

  appId: "1:619288354313:web:96d09d861932cd7ab322d8",

  measurementId: "G-31ZFFJFVY2"

  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };