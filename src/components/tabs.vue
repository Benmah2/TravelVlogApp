<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/home">
          <ion-icon :icon="planetOutline" />
          <ion-label>Feed</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="radio" href="/new-image">
          <ion-icon :icon="addCircleOutline" />
          <ion-label>Post</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="library" href="">
          <ion-icon :icon="personCircleOutline" />
          <ion-label>Profile</ion-label>
        </ion-tab-button>

        <!-- Log Off Button -->
        <ion-tab-button @click="logOff">
          <ion-label>Log Off</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';
import { getAuth, signOut } from "firebase/auth";
import {personCircleOutline, radio, library, search, planetOutline, addCircleOutline } from 'ionicons/icons';
import router from '@/router/index.js';

export default {
  components: { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon },
  data() {
    return {
      planetOutline,
      addCircleOutline,

      radio,
      library,
      search,
      personCircleOutline,
    };
  },
  methods: {
    async logOff() {
      const auth = getAuth();
      try {
        await signOut(auth);
        // Redirect to sign-in page after logging out
        router.replace('/sign-in').then(() => {
          window.location.reload(); // Optionally force a reload
        });
      } catch (error) {
        console.error("Error signing out: ", error);
      }
    }

  }
};
</script>

<style>
ion-tab-bar{
  --background: #744253;

}

ion-tab-button{
  color: #f3d9dc;
}



</style>