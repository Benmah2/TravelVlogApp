import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBr1jbG6VeJ50QOIKxws3qQ6IN79GnN_HM",
    authDomain: "exam2023-b5781.firebaseapp.com",
    projectId: "exam2023-b5781",
    storageBucket: "exam2023-b5781.appspot.com",
    messagingSenderId: "1021580877020",
    appId: "1:1021580877020:web:d76eda661d4ef66516e819",
    measurementId: "G-D1X82NSEPH"
};

// Initialize Firebase
initializeApp(firebaseConfig);


const app = createApp(App)

app.use(router)

app.mount('#app')
