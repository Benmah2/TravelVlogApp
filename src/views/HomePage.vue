



<script setup>
import { IonContent, IonGrid, IonRow , IonCol , IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';

import { ref, onMounted } from 'vue';

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebase"

const imageCollectionRef = collection(db, "images")

const images = ref ([]);

/*
get images
*/

onMounted (() => {
onSnapshot(imageCollectionRef, (querySnapshot) => {
  const fbImages  = [];
  querySnapshot.forEach((doc) => {
    const image = {
    id: doc.id,
    title: doc.data().title,
    description: doc.data().description,
    imageURL: doc.data().imageURL,
    // her kan du hente bruker
    user: doc.data().user
  }
fbImages.push(image)
  });

  images.value = fbImages
});
})

</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Bildestrøm</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid class="grid">
        <ion-row>
          <ion-col
              size="12"
              size-md="3"
              v-for="image in images"
              :key="image.id"
              :router-link="'/detail/' + image.id">
            <ion-card>
              <img :src="image.imageURL" class="grid-image" alt="Image Not found"/>
              <ion-card-header>
                <ion-card-title>{{ image.title }}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                {{ image.description }}
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.grid-image {
  width: auto;
  height: 25vh;
  object-fit: cover;
  border-radius: 10px;
}
.grid {
  background-color: white;
}

ion-row {
  justify-content: center;
}
ion-toolbar {
  --background: #744253;
  color: #f3d9dc;
  text-align: center;
}
ion-card {
  max-height: 50vh;
  padding-top: 0%;
  border-radius: 10px;
  background-color: snow;
}
ion-col {
  color: black;
  margin: 0.3%;
  border-radius: 10px;
  background-color: #d7bea8;
  padding: 0%;
  text-align: center;
}

/* Additional styles for smaller screens */
@media (max-width: 768px) {
  .grid-image {
    height: 40vh; /* Adjust as needed */
  }
}
</style>

