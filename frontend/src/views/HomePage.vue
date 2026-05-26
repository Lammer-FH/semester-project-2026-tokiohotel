<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardContent,
} from '@ionic/vue';
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>[Title]</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <section class="hero">
        <h1>[Title]</h1>
        <p>
          [Description of the hotel and its unique features. This is a placeholder text that should be replaced with actual content about the hotel, its amenities, location, and what makes it special.]
        </p>

        <ion-button router-link="/tabs/rooms">
          View rooms
        </ion-button>
      </section>

      <ion-card>
        <ion-card-content>
          <h2>Comfortable rooms</h2>
          <p>
            Choose from single rooms, double rooms, family rooms and suites.
          </p>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-content>
          <h2>Central location</h2>
          <p>
            Our hotel is located close to public transport, restaurants and city attractions.
          </p>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-content>
          <h2>Easy booking</h2>
          <p>
            Select your room, check availability and complete your booking online.
          </p>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.hero {
  max-width: 900px;
  margin-bottom: 2rem;
}

.hero h1 {
  font-size: 2.2rem;
  margin-bottom: 0.75rem;
}

.hero p {
  color: var(--ion-color-medium);
  font-size: 1.1rem;
  line-height: 1.6;
}
</style>