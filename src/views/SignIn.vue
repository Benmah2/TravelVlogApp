<template>
  <h1>Sign In</h1>
  <p><input type="text" placeholder="Email" v-model="email"/></p>
  <p><input type="password" placeholder="Password" v-model="password"/></p>
  <p><button @click="register">Submit</button></p>
  <p><Button @click="signInWithGoogle">Sign In With Google</Button></p>
</template>
<script setup>
import{ref} from "vue";
import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth"

import router from "@/router/index.js";
import {useRouter} from "vue-router";
const auth = getAuth();

const email = ref("")
const password = ref("")
const errMsg = ref()
const register = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
      .then((data)=>{
        console.log("Successfully signed in!")

        console.log(auth.currentUser)

        router.push('/feed')
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
          case "auth/wrong-password":
            errMsg.value = "Incorrect password";
            break;
          default:
            errMsg.value = "Email or password was incorrect";
            break;
        }
      })
}

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