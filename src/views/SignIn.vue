<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar style="--background: #744253; color: #f3d9dc;">
        <ion-title>Travel Snap</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-segment v-model="activeTab">
        <ion-segment-button value="signIn">
          <ion-label>Sign In</ion-label>
        </ion-segment-button>
        <ion-segment-button value="register">
          <ion-label>Register</ion-label>
        </ion-segment-button>
      </ion-segment>

      <div v-if="activeTab === 'signIn'">
        <!-- Sign In Form -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Sign In to Your Account</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <ion-item>
              <ion-input label="Email" label-placement="floating" type="text" v-model="email" placeholder="Enter your email"></ion-input>
            </ion-item>

            <ion-item>
              <ion-input label="Password" label-placement="floating" type="password" v-model="password" placeholder="Enter your password"></ion-input>
            </ion-item>

            <ion-button expand="block" @click="signIn" class="ion-margin-top">Submit</ion-button>
            <ion-button expand="block" @click="signInWithGoogle" color="secondary">Sign In With Google</ion-button>
          </ion-card-content>
        </ion-card>
      </div>

      <div v-if="activeTab === 'register'">
        <!-- Register Form -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Create an Account</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <ion-item>
              <ion-input label="Email" label-placement="floating" type="text" v-model="registerEmail" placeholder="Enter your email"></ion-input>
            </ion-item>

            <ion-item>
              <ion-input label="Password" label-placement="floating" type="password" v-model="registerPassword" placeholder="Enter your password"></ion-input>
            </ion-item>

            <ion-button expand="block" @click="register" class="ion-margin-top">Register</ion-button>
            <ion-button expand="block" @click="signInWithGoogle" color="secondary">Register With Google</ion-button>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>


<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonSegment, IonSegmentButton } from '@ionic/vue';
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import router from '@/router/index.js';

const auth = getAuth();
const activeTab = ref('signIn');
const email = ref('');
const password = ref('');
const registerEmail = ref('');
const registerPassword = ref('');
const signIn = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    console.log("Successfully signed in!");
    await router.push('/home');
  } catch (error) {
    console.log(error.code);
    alert(error.message);
  }
};


//Register tab
const register = async () => {
  try {
    await createUserWithEmailAndPassword(auth, registerEmail.value, registerPassword.value);
    console.log('Successfully registered!');
    await router.push('/home');
  } catch (error) {
    console.log(error.code);
    alert(error.message);
  }
};




const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    console.log("Signed in with Google");
    await router.push("/home");
  } catch (error) {
    console.log(error);
  }
};


const createUserCollection = async (db, userId, additionalData = {}) => {
  const userDoc = doc(collection(db, 'users'), userId);
  await setDoc(userDoc, {
    ...additionalData,
  }, { merge: true });
};
</script>
<style scoped>
</style>