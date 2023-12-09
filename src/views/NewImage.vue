
<script setup>
import { IonBackButton, IonButton, IonButtons, IonChip, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/vue';

import { ref } from 'vue';

import { Camera, CameraResultType } from '@capacitor/camera';

import{db} from"@/firebase/firebase"
import { addDoc, collection, onSnapshot } from 'firebase/firestore';

//Ref to database in a const to be used other places easy

const imageCollectionRef = collection(db, "images")

// Keeps track of all data input from the user towards adding a new image
const newImage = ref({
    title: "",
    description: "",
    imageURL: ""
});

// takes input from user and sends it to firebase???????

const addImage = () => {
    addDoc(imageCollectionRef, {
  title: newImage.value.title,
  description: newImage.value.description,
  imageURL: newImage.value.imageURL
});

    newImage.value = ""
}

// Open camera or file picker

const openImages = async () => {
    const photo = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Uri
    });

     if (photo.webPath) {
        newImage.value.imageURL = photo.webPath;    
    } 
}

</script>

<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/"></ion-back-button>
                </ion-buttons>
                <ion-title>Legg til nytt bilde</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">

            <ion-list>
                <ion-button @click="openImages">
                    Kamera/Lastopp
                </ion-button>
                <section v-if="newImage.imageURL">
                    <img :src="newImage.imageURL"/>
                </section>

                <ion-item>
                    <ion-label class="label-mild" position="floating">Tittel</ion-label>
                    <ion-input type="text" v-model="newImage.title"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label class="label-mild" position="floating">Beskrivelse</ion-label>
                    <ion-input type="text" v-model="newImage.description"></ion-input>
                </ion-item>

                <ion-button @click="addImage" class="button-add" fill="solid" color="dark" size="default">
                    Legg ut bilde
                </ion-button>

            </ion-list>

        </ion-content>
    </ion-page>
</template>
    
