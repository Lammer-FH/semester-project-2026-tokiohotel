<script setup lang="ts">
import { onMounted } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonSpinner,
  IonText,
} from '@ionic/vue';

import { useRoomStore } from '@/stores/roomStore';
import type { Room } from '@/types/api';

import RoomCard from '@/components/rooms/RoomCard.vue';
import RoomPagination from '@/components/rooms/RoomPagination.vue';

const roomStore = useRoomStore();

onMounted(() => {
  roomStore.fetchRooms({ page: 0, size: 5 });
});

function changePage(page: number) {
  roomStore.fetchRooms({ page, size: 5 });
}

function selectRoom(room: Room) {
  roomStore.selectedRoom = room;
  console.log('Selected room:', room);
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Rooms</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <section class="page-intro">
        <h1>Choose your room</h1>
        <p>
          Find a room that fits your stay at our hotel.
        </p>
      </section>

      <div v-if="roomStore.loading" class="center">
        <ion-spinner />
      </div>

      <ion-text v-else-if="roomStore.error" color="danger">
        <p>{{ roomStore.error }}</p>
      </ion-text>

      <ion-grid v-else>
        <ion-row>
          <ion-col
            v-for="room in roomStore.rooms"
            :key="room.id"
            size="12"
            size-md="6"
            size-lg="4"
          >
            <RoomCard :room="room" @select="selectRoom" />
          </ion-col>
        </ion-row>
      </ion-grid>

      <RoomPagination
        :pagination="roomStore.pagination"
        @change-page="changePage"
      />
    </ion-content>
  </ion-page>
</template>

<style scoped>
.page-intro {
  max-width: 800px;
  margin-bottom: 1.5rem;
}

.page-intro h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.page-intro p {
  color: var(--ion-color-medium);
}

.center {
  display: flex;
  justify-content: center;
  padding: 3rem;
}
</style>