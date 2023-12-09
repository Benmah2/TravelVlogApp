



<script setup>
import { IonContent, IonGrid ,IonButtons, IonButton, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';

import { ref, onMounted } from 'vue';

import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase"

const imageCollectionRef = collection(db, "images")

//xxxnnnnx

const images = ref ([
  
   
]);

/*
get images
*/

onMounted (() => {
  

onSnapshot(imageCollectionRef, (querySnapshot) => {
  const fbImages = [];
  querySnapshot.forEach((doc) => {
    const image = {
    id: doc.id,
    title: doc.data().title,
    description: doc.data().description,
    imageURL: doc.data().imageURL
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
        <ion-title>Images</ion-title>
        <ion-buttons slot="end">
          <ion-button router-link="/new-image">Legg til flere bilder +</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

      <ion-card v-for="image in images" :key="image.id" :router-link="'/detail/' + image.id">
        <img :src="image.imageURL" />
        <ion-card-header>
          <ion-card-title>{{ image.title }}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          {{ image.description }}
        </ion-card-content>

      </ion-card>


    </ion-content>
  </ion-page>
</template>




