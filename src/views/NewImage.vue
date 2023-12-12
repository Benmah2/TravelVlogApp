
<script setup>
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, toastController } from '@ionic/vue';
import { add, trashOutline } from 'ionicons/icons';
import { ref } from 'vue';
import { Camera, CameraResultType } from '@capacitor/camera';
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import {
  getStorage,
  uploadBytes,
  getDownloadURL,
  ref as dbRef,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { useRouter } from 'vue-router';
const router = useRouter();

//Ref to database in a const to be used other places easy

const imageCollectionRef = collection(getFirestore(), "images")


//her

// Keeps track of all data input from the user towards adding a new image
 const newImage = ref({
     title: "",
     description: "",
     imageURL: []
 });


// Uploads the picture plus other info like title. Checks if the picture is valid.

const addImage = async () => {

  if (newImage.value.imageURL.length === 0) {
    alert("Du må laste opp et bilde");
    return;
  }

  try {
    const generatedUUID = uuidv4();
    const newImageURL = [];
    for (const imageUrl of newImage.value.imageURL) {

      const imageName = new Date().getTime() + '.jpg';
      const storageRef = getStorage();
      const imageRef = dbRef(storageRef, `images/${imageName}`);
      const response = await fetch(imageUrl);
      const imageBlob = await response.blob();
      const snapshot = await uploadBytes(imageRef, imageBlob);
      const url = await getDownloadURL(snapshot.ref);
      newImageURL.push(url);
    }
    newImage.value.imageURL = newImageURL;
    newImage.value.id = generatedUUID;
    await setDoc(doc(imageCollectionRef, generatedUUID), newImage.value);
    const successToast = await toastController.create({
      message: 'Bildet ble lastet opp',
      duration: 1500,
      position: 'bottom',
      color: 'success'
    });

    await successToast.present();
    router.replace('/home');

  } catch (error) {
    const errorToast = await toastController.create({
      message: 'Noe gikk galt når vi prøvde å lasteopp bildet',
      duration: 2500,
      position: 'bottom',
      color: 'danger'
    });

    await errorToast.present();
    console.error(error);
  }

}



//Makes it possible to remove a picture that is already picked.
const removeImagePreview = (index) => {

  if (index >= 0 && index < newImage.value.imageURL.length) {

    newImage.value.imageURL.splice(index, 1);
  }
}


// Open camera or file picker UI.

const openImages = async () => {
    const photo = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Uri
    });

     if (photo.webPath) {
        newImage.value.imageURL.push (photo.webPath)
    }

}


</script>

<template>

  <ion-page>
    <ion-header class="ion-margin-bottom">
      <ion-toolbar class="ion-text-center">
        <ion-title>
          Legg til bilde
        </ion-title>

      </ion-toolbar>
    </ion-header>

    <ion-content >

      <ion-list >
        <ion-button @click="openImages" class="image-upload-btn">
          Kamera/Lastopp
        </ion-button>
        <section v-if="newImage.imageURL.length">
          <div v-for="(imageUrl, index) in newImage.imageURL" :key="index">
            <ion-img class="image-preview" :src="imageUrl" />
            <ion-button @click="() => removeImagePreview(index)" fill="default" class="remove-image-preview">
              <ion-icon slot="icon-only" :icon="trashOutline" color="danger"></ion-icon>
            </ion-button>
          </div>
        </section>
        <ion-item>
          <ion-label class="label-mild" position="floating">Tittel</ion-label>
          <ion-input type="text" v-model="newImage.title"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label class="label-mild" position="floating">Beskrivelse</ion-label>
          <ion-input type="text" v-model="newImage.description"></ion-input>
        </ion-item>

        <ion-button @click="addImage" class="button-add" fill="solid" size="default">
          Legg ut bilde
        </ion-button>
      </ion-list>

    </ion-content>
  </ion-page>
</template>


<style>


.image-upload-btn{
  --background: #c78283;
  color: #f3d9dc;
}
.button-add {
  --background: #744253;
  color: #f3d9dc;
}
.ion-text-center {
  --background: #744253;
  color: #f3d9dc;
}

ion-list {
  text-align: center;
}
.image-preview {
  height: 40vh;

}

</style>
