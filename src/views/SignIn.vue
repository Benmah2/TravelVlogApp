<template>
  <h1>Sign In</h1>
  <p><input type="text" placeholder="Email" v-model="email"/></p>
  <p><input type="password" placeholder="Password" v-model="password"/></p>
  <p><button @click="signIn">Submit</button></p>
  <p><Button @click="signInWithGoogle">Sign In With Google</Button></p>
</template>
<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import router from "@/router/index.js";

const auth = getAuth();
const db = getFirestore();
//HH
const email = ref("");
const password = ref("");
const errMsg = ref("");
const signIn = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        console.log("Successfully signed in!");
        router.push('/feed');
      })
      .catch((error) => {
        console.log(error.code);
        switch (error.code) {
          case "auth/invalid-email":
            errMsg.value = "Invalid Email";
            break;
          case "auth/user-not-found":
            errMsg.value = "No account with that email was found";
            break;

            /test
          case "auth/wrong-password":
            errMsg.value = "Incorrect password";
            break;
          default:
            errMsg.value = "Email or password was incorrect";
            break;
        }
      });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        // Update the user document with the latest Google account information
        createUserCollection(db, result.user.uid, {
          email: result.user.email,
          name: result.user.displayName,
          // other Google-specific data
        });
        router.push("/feed");
      })
      .catch((error) => {
        console.log(error);
      });
};

const createUserCollection = async (db, userId, additionalData = {}) => {
  const userDoc = doc(collection(db, 'users'), userId);
  await setDoc(userDoc, {
    ...additionalData,
  }, { merge: true });
};
</script>
