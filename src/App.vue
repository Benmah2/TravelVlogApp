<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/feed">Feed</router-link>
    <router-link to="/register">Register</router-link>
    <router-link to="/sign-in">Login</router-link>
    <button @click="handleSignOut" v-if="isLoggedIn">Sign out</button>
  </nav>
  <router-view/>
</template>


<script setup>
import {onMounted, ref} from "vue";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import router from "@/router/index.js";

const isLoggedIn = ref(false);

let auth;
onMounted(() => {
auth = getAuth();
onAuthStateChanged(auth, (user)=> {
  isLoggedIn.value = !!user;
});
});
const handleSignOut =() => {
signOut(auth).then(() => {
router.push("/");
});
};
</script>



<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
