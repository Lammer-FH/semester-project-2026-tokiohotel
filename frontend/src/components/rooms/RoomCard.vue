<script setup lang="ts">
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonImg,
  IonButton,
} from '@ionic/vue';

import type { Room } from '@/types/api';
import RoomExtras from './RoomExtras.vue';

defineProps<{
  room: Room;
}>();

const emit = defineEmits<{
  select: [room: Room];
}>();

function getRoomImage(room: Room): string {
  return room.room_type?.images?.[0] ?? 'https://placehold.co/600x400?text=Hotel+Room';
}
</script>

<template>
  <ion-card class="room-card">
    <ion-img class="room-image" :src="getRoomImage(room)" :alt="room.room_type?.title" />

    <ion-card-header>
      <ion-card-title>
        {{ room.room_type?.title }}
      </ion-card-title>

      <ion-card-subtitle>
        Room {{ room.room_number }} ·
        {{ room.room_type?.capacity }} guest<span v-if="room.room_type?.capacity !== 1">s</span>
      </ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      <p class="description">
        {{ room.room_type?.description }}
      </p>

      <RoomExtras :extras="room.room_type?.extras" />

      <div class="card-footer">
        <strong class="price">
          €{{ room.room_type?.cost?.toFixed(2) }}
        </strong>

        <ion-button size="small" @click="emit('select', room)">
          View details
        </ion-button>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<style scoped>
.room-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.room-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.description {
  line-height: 1.5;
  color: var(--ion-color-medium);
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.price {
  font-size: 1.1rem;
  color: var(--ion-color-primary);
}
</style>