<script setup lang="ts">
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/vue';

import {
  homeOutline,
  bedOutline,
  informationCircleOutline,
  documentTextOutline,
} from 'ionicons/icons';
</script>

<template>
  <ion-tabs>
    <ion-router-outlet />

    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="home" href="/tabs/home">
        <ion-icon :icon="homeOutline" />
        <ion-label>Home</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="rooms" href="/tabs/rooms">
        <ion-icon :icon="bedOutline" />
        <ion-label>Rooms</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="about" href="/tabs/about">
        <ion-icon :icon="informationCircleOutline" />
        <ion-label>About</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="imprint" href="/tabs/imprint">
        <ion-icon :icon="documentTextOutline" />
        <ion-label>Imprint</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>