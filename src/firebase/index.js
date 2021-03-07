import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBcmBW_1nua8lOzjRwAeyQZ-Q8J3rAXrl8",
    authDomain: "matsci-experiments.firebaseapp.com",
    projectId: "matsci-experiments",
    storageBucket: "matsci-experiments.appspot.com",
    databaseURL:"https://matsci-experiments-default-rtdb.firebaseio.com/",
    messagingSenderId: "896912941704",
    appId: "1:896912941704:web:b3ccec3f8326148b93753d",
    measurementId: "G-MW881NS2CS"
  };

  firebase.initializeApp(firebaseConfig)

  const storage = firebase.storage();
  const database = firebase.database();

  export {storage,database, firebase as default};