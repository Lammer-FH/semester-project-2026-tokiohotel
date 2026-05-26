<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
} from '@ionic/vue';
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Imprint</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <section class="page-section">
        <h1>Imprint</h1>
        <p>
           Legal information...
        </p>
      </section>

      <ion-card>
        <ion-card-content>
          <h2>[Company]</h2>
          <p>[Title]</p>
          <p>[Address]</p>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-content>
          <h2>Contact</h2>
          <p>Email: ---</p>
          <p>Phone: ---</p>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-content>
          <h2>Disclaimer</h2>
          <p>
            [placeholder text for legal disclaimer, e.g. about content accuracy, liability, etc.]
          </p>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.page-section {
  max-width: 900px;
  margin-bottom: 1.5rem;
}

.page-section h1 {
  font-size: 2rem;
}

.page-section p {
  color: var(--ion-color-medium);
}
</style>