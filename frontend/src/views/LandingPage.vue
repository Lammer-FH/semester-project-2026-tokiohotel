<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>TokioHotel</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon :icon="personCircleOutline" slot="icon-only" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="availability-box">
        <span>Check Availability: start - end</span>
      </div>

      <div class="rooms-section">
        <h2 class="rooms-title">Rooms</h2>
        <div class="rooms-grid">
          <div v-for="i in 4" :key="i" class="room-card-placeholder" />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon } from '@ionic/vue';
import { personCircleOutline } from 'ionicons/icons';
</script>

<style scoped>
.availability-box {
  margin: 16px;
  padding: 16px;
  border-radius: 12px;
  background-color: var(--ion-color-light);
  border: 1px solid var(--ion-color-medium);
  text-align: center;
  color: var(--ion-color-medium);
}

.rooms-section {
  padding: 0 16px;
}

.rooms-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 12px;
}

.rooms-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.room-card-placeholder {
  height: 160px;
  border-radius: 12px;
  background-color: var(--ion-color-light);
}
</style>
