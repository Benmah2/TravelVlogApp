<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="register">Submit</button></p>
  <p><Button @click="signInWithGoogle">Sign In With Google</Button></p>
</template>

<script setup>
import { ref } from 'vue';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import router from '@/router/index.js';

// Initialize Firebase Authentication and Firestore
const auth = getAuth();
const db = getFirestore();

const email = ref('');
const password = ref('');

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        console.log('Successfully registered!');
        createUserCollection(db, userCredential.user.uid, {
          email: email.value,  // Use the email from the input field
          // other registration-specific data
        });
        router.push('/feed');
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
      });
};




const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        createUserCollection(db, result.user.uid, {
          email: result.user.email,  // Use the email from Google
          name: result.user.displayName,
          // other Google-specific data
        });
        router.push('/feed');
      })
      .catch((error) => {
        console.log(error);
      });
};


const createUserCollection = async (db, userId, additionalData = {}) => {
  const userDoc = doc(collection(db, 'users'), userId);
  await setDoc(userDoc, {
    ...additionalData,
    // additional data will include either email/password or Google account information
  }, { merge: true });  // Use merge to avoid overwriting existing data
};

</script>
