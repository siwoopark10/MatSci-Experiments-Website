import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBcmBW_1nua8lOzjRwAeyQZ-Q8J3rAXrl8",
  authDomain: "matsci-experiments.firebaseapp.com",
  projectId: "matsci-experiments",
  storageBucket: "matsci-experiments.appspot.com",
  databaseURL: "https://matsci-experiments-default-rtdb.firebaseio.com/",
  messagingSenderId: "896912941704",
  appId: "1:896912941704:web:b3ccec3f8326148b93753d",
  measurementId: "G-MW881NS2CS"
};

async function loginWithEmail(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}

async function registerWithEmail(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
}

const fire = firebase.initializeApp(firebaseConfig);
export default fire;

if (!firebase.apps.length) {
  firebase.initializeApp({});
} else {
  firebase.app(); // if already initialized, use that one
}

const storage = firebase.storage();
const database = firebase.database();

export { storage, database, loginWithEmail, registerWithEmail };