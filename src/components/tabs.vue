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

        <ion-tab-button  tab="library" href="">
          <ion-icon :icon="personCircleOutline" />
          <ion-label>Profile</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';

import { playCircle, personCircleOutline, radio, library, search, planetOutline, addCircleOutline } from 'ionicons/icons';

export default {
  components: { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon },
  data() {
    return {
      planetOutline,
      addCircleOutline,
      playCircle,
      radio,
      library,
      search,
      personCircleOutline,
    };
  },
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