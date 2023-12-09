
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBr1jbG6VeJ50QOIKxws3qQ6IN79GnN_HM",
  authDomain: "exam2023-b5781.firebaseapp.com",
  databaseURL: "https://exam2023-b5781-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "exam2023-b5781",
  storageBucket: "exam2023-b5781.appspot.com",
  messagingSenderId: "1021580877020",
  appId: "1:1021580877020:web:d76eda661d4ef66516e819",
  measurementId: "G-D1X82NSEPH"
};



const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


export {
    db
} 