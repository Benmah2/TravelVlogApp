


<script setup>
import { IonModal, IonTextarea, IonBackButton, IonButton, IonAvatar, IonText, IonIcon, IonItem, IonListHeader, IonLabel, IonList, IonCardHeader, IonCardSubtitle, IonButtons, IonCard, IonCardContent, IonChip, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/vue";
import { ref } from 'vue';
import { chatboxOutline, image } from 'ionicons/icons';
import { useRoute } from 'vue-router';

const route = useRoute();
const { id } = route.params;

/* Using the route object, we can get data for the user's current route */

/* Retrieve the id parameter from the current route's query string (/detail/:id) */


/* State */



/* "Dummy data" for displaying in the UI until we connect the app to an API */
const images = ref ({
id: 1,
  title: "Fin plass ved Ulsrudvann",
  description: "Fant denne da jeg gikk kveldstur rundt vannet",
  imageURL: "https://i0.wp.com/fantastiskemarka.no/wp-content/uploads/2018/07/teltplass-ved-store-skillingen-oslomarka-nordmarka-fantastiske-marka.jpg?resize=800%2C530&ssl=1"
  
})

</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>{{images.title}}</ion-title>
        <ion-buttons slot="end">
          <ion-button >
            <ion-icon :icon="chatboxOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

      <!-- Hero image section -->
      <img :alt="images.title" :src="images.imageURL" />


      <!-- Camping spot info section -->
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>Turbeskrivelse</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          {{images.description}}
        </ion-card-content>
      </ion-card>

    
    </ion-content>
  </ion-page>
</template>