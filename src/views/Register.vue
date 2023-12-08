<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email"/></p>
  <p><input type="password" placeholder="Password" v-model="password"/></p>
  <p><button @click="register">Submit</button></p>
  <p><Button @click="signInWithGoogle">Sign In With Google</Button></p>
</template>
<script setup>
import{ref} from "vue";
import {getAuth, createUserWithEmailAndPassword,GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import {useRouter} from "vue-router";
import router from "@/router/index.js";
const auth = getAuth();
import { collection, doc, setDoc } from 'firebase/firestore';

const email = ref("")
const password = ref("")
const register = () => {
createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential)=>{
      console.log("Successfully registered!")
      createUserCollection(db, userCredential.user.uid);
      console.log(auth.currentUser)

      router.push('/feed')
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    })
}
const createUserCollection = async (db, userId) => {
  const userDoc = doc(collection(db, 'users'), userId);
  await setDoc(userDoc, { /* initial data */ });
};
const signInWithGoogle = () => {
const provider = new GoogleAuthProvider();
signInWithPopup(getAuth(), provider)
.then((result) => {
console.log(result.user);
router.push("/feed");
})
    .catch((error) => {

  });
};
</script>