<script setup lang="ts">
import { IonChip, IonIcon, IonLabel } from '@ionic/vue';
import {
  wifi,
  tvOutline,
  wineOutline,
  waterOutline,
  bedOutline,
  personOutline,
  helpCircleOutline,
} from 'ionicons/icons';

import type { Extra } from '@/types/api';

defineProps<{
  extras?: Extra[];
}>();

function getIcon(iconName?: string) {
  switch (iconName) {
    case 'wifi':
      return wifi;
    case 'tv-outline':
      return tvOutline;
    case 'wine-outline':
      return wineOutline;
    case 'water-outline':
      return waterOutline;
    case 'bed-outline':
      return bedOutline;
    case 'person-outline':
      return personOutline;
    default:
      return helpCircleOutline;
  }
}
</script>

<template>
  <div class="room-extras">
    <ion-chip v-for="extra in extras" :key="extra.id">
      <ion-icon :icon="getIcon(extra.icon)" />
      <ion-label>{{ extra.name }}</ion-label>
    </ion-chip>
  </div>
</template>

<style scoped>
.room-extras {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 0.75rem;
}
</style>