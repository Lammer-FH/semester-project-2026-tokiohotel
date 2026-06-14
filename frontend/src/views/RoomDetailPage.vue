<template>
  <ion-page>
    <ion-content :fullscreen="false" class="dark-page">
      <AppHeader :dark="true" />

      <div class="detail-page">
        <div class="detail-topbar">
          <button type="button" class="btn-outline" @click="goBack">
            Zurück
          </button>
        </div>

        <StateMessage
          v-if="store.loading"
          message="Zimmer wird geladen…"
        />

        <StateMessage
          v-else-if="store.error"
          variant="error"
          title="Zimmer konnte nicht geladen werden"
          message="Bitte prüfen Sie Ihre Verbindung oder versuchen Sie es später erneut."
          retry-label="Erneut versuchen"
          @retry="loadRoom"
        />

        <StateMessage
          v-else-if="!room"
          message="Zimmer nicht gefunden."
        />

        <article v-else class="detail">
          <div class="detail-image-wrap">
            <img
              :src="imageUrl"
              :alt="room.roomType?.title"
              class="detail-image"
            />
          </div>

          <div class="detail-body">
            <header class="detail-header">
              <div class="detail-title-group">
                <h1 class="detail-title heading-serif">{{ room.roomType?.title }}</h1>
                <AvailabilityBadge :status="availabilityStatus" />
              </div>

              <span class="detail-price">
                €{{ room.roomType?.cost?.toFixed(2) }}<span class="per-night"> / Nacht</span>
              </span>
            </header>

            <p class="detail-description">{{ room.roomType?.description }}</p>

            <div class="detail-meta">
              <span class="meta-item">{{ room.roomType?.capacity }} Personen</span>
              <span class="meta-item">Zimmer {{ room.roomNumber }}</span>
            </div>

            <ExtraChipList :extras="room.roomType?.extras ?? []" />

            <ion-button
              expand="block"
              class="btn-primary book-button"
              :disabled="isUnavailable"
              @click="goToBooking"
            >
              {{ isUnavailable ? 'Nicht verfügbar' : 'Buchen' }}
            </ion-button>
          </div>
        </article>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import AppHeader from '@/components/organism/AppHeader.vue';
import StateMessage from '@/components/atoms/StateMessage.vue';
import AvailabilityBadge from '@/components/atoms/AvailabilityBadge.vue';
import ExtraChipList from '@/components/atoms/ExtraChipList.vue';
import { useRoomStore } from '@/stores/roomStore';
import { resolveRoomImage } from '@/utils/roomImages';

const route = useRoute();
const router = useRouter();
const store = useRoomStore();

const room = computed(() => store.selectedRoom);

const startDate = computed(() => route.query.startDate as string | undefined);
const endDate = computed(() => route.query.endDate as string | undefined);

const availabilityStatus = computed(() => store.availability);

const isUnavailable = computed(() => store.availability === 'unavailable');

const imageUrl = computed(() =>
  resolveRoomImage(
    room.value?.roomType?.images as string[] | string | undefined,
    room.value?.roomType?.title,
  ),
);

function loadRoom() {
  const id = Number(route.params.id);
  if (!Number.isNaN(id)) {
    store.fetchRoomById(id);
    checkRoomAvailability(id);
  }
}

function checkRoomAvailability(id: number) {
  if (startDate.value && endDate.value) {
    store.checkAvailability(id, startDate.value, endDate.value);
  } else {
    store.availability = 'unknown';
  }
}

function goBack() {
  router.push({ path: '/rooms', query: route.query });
}

function goToBooking() {
  if (room.value?.id != null && !isUnavailable.value) {
    router.push({
      path: `/rooms/${room.value.id}/book`,
      query: route.query,
    });
  }
}

onMounted(loadRoom);
watch(() => route.params.id, loadRoom);
watch([startDate, endDate], () => {
  const id = Number(route.params.id);
  if (!Number.isNaN(id)) checkRoomAvailability(id);
});
</script>

<style scoped>
.detail-topbar {
  display: flex;
  padding: 12px 0 0;
}

.detail-page {
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 0 24px 64px;
}

.detail {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.detail-image-wrap {
  width: 100%;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  background: #1a1a1a;
}

.detail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.detail-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.detail-title-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}

.detail-title {
  font-size: 32px;
  line-height: 1.2;
}

.detail-price {
  font-size: 22px;
  font-weight: 600;
  color: #c9a96e;
  white-space: nowrap;
}

.per-night {
  font-size: 13px;
  font-weight: 400;
  color: #a0998a;
}

.detail-description {
  font-size: 15px;
  color: #a0998a;
  line-height: 1.6;
  margin: 0;
}

.detail-meta {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #8a8278;
  letter-spacing: 0.04em;
}

.book-button {
  margin-top: 16px;
}

@media (min-width: 768px) {
  .detail-page {
    padding: 0 40px 64px;
  }

  .detail {
    flex-direction: row;
    padding: 32px 0;
    gap: 40px;
  }

  .detail-image-wrap {
    flex: 1;
    aspect-ratio: 4 / 3;
  }

  .detail-body {
    flex: 1;
    padding: 0;
  }

  .detail-title {
    font-size: 40px;
  }
}

@media (min-width: 1024px) {
  .detail-page {
    padding: 0 64px 64px;
  }

  .detail {
    padding: 48px 0;
  }

  .detail-title {
    font-size: 48px;
  }
}
</style>
