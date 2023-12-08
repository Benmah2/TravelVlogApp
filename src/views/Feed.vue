<template>
  <div>
    <h1>User Feed</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="item in userData" :key="item.id">
        <!-- Display your data here -->
        <p>{{ item.title }}</p> <!-- Example -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const userData = ref([]);
const loading = ref(true);
const auth = getAuth();
const db = getFirestore();

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await fetchUserData(user.uid);
    } else {
      // Handle the case where the user is not logged in
    }
  });
});

const fetchUserData = async (userId) => {
  loading.value = true;
  try {
    const q = query(collection(db, 'users'), where('__name__', '==', userId));
    const querySnapshot = await getDocs(q);
    userData.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching user data: ", error);
  }
  loading.value = false;
};
</script>

<style>
/* Add your styling here */
</style>
