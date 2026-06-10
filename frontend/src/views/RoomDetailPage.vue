<template>
  <ion-page>
    <ion-content :fullscreen="false">
      <AppHeader :dark="true" />

      <div class="detail-page">
        <div v-if="store.loading" class="state-message">
          Zimmer wird geladen…
        </div>

        <div v-else-if="store.error" class="state-message state-message--error">
          <h2>Zimmer konnte nicht geladen werden</h2>
          <p>
            Bitte prüfen Sie Ihre Verbindung oder versuchen Sie es später erneut.
          </p>
          <button type="button" class="retry-btn" @click="loadRoom">
            Erneut versuchen
          </button>
        </div>

        <div v-else-if="!room" class="state-message">
          Zimmer nicht gefunden.
        </div>

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
                <h1 class="detail-title">{{ room.roomType?.title }}</h1>
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

            <div v-if="room.roomType?.extras?.length" class="detail-extras">
              <span
                v-for="extra in room.roomType.extras"
                :key="extra.id"
                class="extra-chip"
              >
                <ion-icon :name="extra.icon" class="extra-icon" />
                {{ extra.name }}
              </span>
            </div>

            <ion-button
              expand="block"
              class="book-button"
              @click="goToBooking"
            >
              Buchen
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
import { IonPage, IonContent, IonIcon, IonButton } from '@ionic/vue';
import AppHeader from '@/components/organism/AppHeader.vue';
import AvailabilityBadge from '@/components/atoms/AvailabilityBadge.vue';
import { useRoomStore } from '@/stores/roomStore';

const route = useRoute();
const router = useRouter();
const store = useRoomStore();

const room = computed(() => store.selectedRoom);

const startDate = computed(() => route.query.startDate as string | undefined);
const endDate = computed(() => route.query.endDate as string | undefined);

const availabilityStatus = computed(() => store.availability);

const imageUrl = computed(() => {
  const images = room.value?.roomType?.images;

  if (Array.isArray(images) && images.length > 0) {
    return images[0];
  }

  if (typeof images === 'string') {
    const first = images.split(',')[0]?.trim();
    if (first) {
      return first.startsWith('/') ? first : `/${first}`;
    }
  }

  return `https://placehold.co/1200x800?text=${encodeURIComponent(
    room.value?.roomType?.title ?? 'Room',
  )}`;
});

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
  }
}

function goToBooking() {
  if (room.value?.id != null) {
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
.detail-page {
  background: #111111;
  min-height: 100vh;
  padding-bottom: 64px;
}

.state-message {
  padding: 64px 24px;
  text-align: center;
  color: #a0998a;
  font-size: 15px;
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
  padding: 0 24px;
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
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 32px;
  font-weight: 400;
  font-style: italic;
  color: #f5f0e8;
  margin: 0;
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

.detail-extras {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.extra-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #a0998a;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 6px 12px;
  border-radius: 4px;
}

.extra-icon {
  font-size: 15px;
  color: #c9a96e;
}

.book-button {
  --background: #c9a96e;
  --background-hover: #b89858;
  --color: #111111;
  --border-radius: 0;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 14px;
  margin-top: 16px;
}

.state-message h2 {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 28px;
  font-weight: 400;
  font-style: italic;
  color: #f5f0e8;
  margin: 0 0 12px;
}

.state-message p {
  color: #a0998a;
  margin: 0 0 20px;
}

.state-message--error {
  max-width: 520px;
  margin: 0 auto;
}

.retry-btn {
  background: transparent;
  color: #c9a96e;
  border: 1px solid #c9a96e;
  padding: 10px 22px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.retry-btn:hover {
  background: #c9a96e;
  color: #111111;
}

@media (min-width: 768px) {
  .detail {
    flex-direction: row;
    padding: 32px 40px;
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
  .detail {
    padding: 48px 64px;
    max-width: 1400px;
    margin: 0 auto;
  }

  .detail-title {
    font-size: 48px;
  }
}
</style>