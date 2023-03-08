import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8fjR8RAp_em4wI-8s-DUTWrfIFC15uKM",
  authDomain: "gifted-chat-92f8a.firebaseapp.com",
  projectId: "gifted-chat-92f8a",
  storageBucket: "gifted-chat-92f8a.appspot.com",
  messagingSenderId: "952382154988",
  appId: "1:952382154988:web:2fb22d100de86a9fb25dc9",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
