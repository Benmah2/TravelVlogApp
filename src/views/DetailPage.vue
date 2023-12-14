


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { db } from "@/firebase/firebase";

import { IonModal, IonSpinner, IonTextarea, IonBackButton, IonButton, IonAvatar, IonText, IonIcon, IonItem, IonListHeader, IonLabel, IonList, IonCardHeader, IonCardSubtitle, IonButtons, IonCard, IonCardContent, IonChip, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewDidEnter } from "@ionic/vue";
const route = useRoute();
const imageId = route.params.id; //  match parameter name in route
const imageDetails = ref(null);

onMounted(async () => {
  try {
    const docRef = doc(db, "images", imageId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      imageDetails.value = { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such document!");
      // Handle the case where the document does not exist
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    // Handle any errors in fetching
  }
});
</script>


<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title></ion-title>

      </ion-toolbar>
    </ion-header>

    <ion-content class="ddd" :fullscreen="true">
      <img class="image-preview-detail" v-if="imageDetails" :alt="imageDetails.title" :src="imageDetails.imageURL" />
      <ion-card class="card-detail">
      <ion-card-content v-if="imageDetails">
        <ion-card-header>
          <ion-card-subtitle>Beskrivelse:</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          {{ imageDetails.description }}
        </ion-card-content>
      </ion-card-content>

      <ion-card-content>
        maps
      </ion-card-content>
      </ion-card>

      <ion-card class="card-detail" >
        <ion-card-content>
          kommentar
        </ion-card-content>
        <ion-card-content>
        kommentar
      </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<style>
ion-toolbar {
--background: #744253;
color: #f3d9dc;
text-align: center;
}
.image-preview-detail {
  height:50vh;
}
.card-detail {
  background-color: #d7bea8;
}

.ddd {
  text-align: center;
}

</style>