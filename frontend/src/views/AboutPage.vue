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
        <ion-title>About</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <section class="page-section">
        <h1>About Boutique Hotel Technikum</h1>
        <p>
          Boutique Hotel Technikum is a small modern hotel focused on comfortable stays,
          clear service and a smooth digital booking process.
        </p>
      </section>

      <ion-card>
        <ion-card-content>
          <h2>Our concept</h2>
          <p>
            [placeholder text for the hotel's concept]
          </p>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-content>
          <h2>What guests can expect</h2>
          <p>
            [placeholder text for what guests can expect] 
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
  line-height: 1.6;
}
</style>