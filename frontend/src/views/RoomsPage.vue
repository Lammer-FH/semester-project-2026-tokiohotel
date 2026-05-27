<template>
  <ion-page>
    <ion-content :fullscreen="false">
      <AppHeader :dark="true" />
      <div class="rooms-page">
        <header class="rooms-header">
          <h1 class="section-heading">Verfügbare Zimmer</h1>
          <p v-if="activeFilters" class="filter-summary">{{ activeFilters }}</p>
        </header>

        <div v-if="store.loading" class="state-message">Zimmer werden geladen…</div>

        <div v-else-if="!store.loading && filteredRooms.length === 0" class="state-message">
          Keine Zimmer für Ihre Anfrage gefunden.
        </div>

        <ul v-else class="room-list">
          <li
            v-for="room in filteredRooms"
            :key="room.id"
            class="room-card"
            @click="router.push(`/rooms/${room.id}`)"
          >
            <div class="card-image-wrap">
              <img
                :src="room.room_type?.images?.[0] ?? `https://placehold.co/600x400?text=${encodeURIComponent(room.room_type?.title ?? 'Room')}`"
                :alt="room.room_type?.title"
                class="card-image"
              />
            </div>
            <div class="card-body">
              <div class="card-top">
                <h2 class="card-title">{{ room.room_type?.title }}</h2>
                <span class="card-price">
                  €{{ room.room_type?.cost?.toFixed(2) }}<span class="per-night"> / Nacht</span>
                </span>
              </div>
              <p class="card-description">{{ room.room_type?.description }}</p>
              <div class="card-meta">
                <span class="meta-capacity">{{ room.room_type?.capacity }} Personen</span>
                <span class="meta-room-number">Zimmer {{ room.room_number }}</span>
              </div>
              <div v-if="room.room_type?.extras?.length" class="card-extras">
                <span
                  v-for="extra in room.room_type.extras"
                  :key="extra.id"
                  class="extra-chip"
                >
                  <ion-icon :name="extra.icon" class="extra-icon" />
                  {{ extra.name }}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import AppHeader from '@/components/organism/AppHeader.vue';
import { useRoomStore } from '@/stores/roomStore';

const route = useRoute();
const router = useRouter();
const store = useRoomStore();

const startDate = computed(() => route.query.startDate as string | undefined);
const endDate = computed(() => route.query.endDate as string | undefined);
const roomTypeFilter = computed(() => route.query.roomType as string | undefined);

const filteredRooms = computed(() => {
  if (!roomTypeFilter.value) return store.rooms;
  return store.rooms.filter((r) => r.room_type?.title === roomTypeFilter.value);
});

const activeFilters = computed(() => {
  const parts: string[] = [];
  if (startDate.value) parts.push(`ab ${startDate.value}`);
  if (endDate.value) parts.push(`bis ${endDate.value}`);
  if (roomTypeFilter.value) parts.push(roomTypeFilter.value);
  return parts.join(' · ') || null;
});

async function loadRooms() {
  await store.fetchRooms({
    startDate: startDate.value,
    endDate: endDate.value,
    page: 0,
    size: 5,
  });
}

onMounted(loadRooms);
watch([startDate, endDate], loadRooms);
</script>

<style scoped>
.rooms-page {
  background: #111111;
  min-height: 100vh;
}

.rooms-header {
  padding: 48px 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-heading {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 36px;
  font-weight: 400;
  font-style: italic;
  color: #f5f0e8;
  margin: 0;
  line-height: 1.2;
}

.filter-summary {
  font-size: 13px;
  color: #c9a96e;
  margin: 0;
  letter-spacing: 0.04em;
}

.state-message {
  padding: 64px 24px;
  text-align: center;
  color: #a0998a;
  font-size: 15px;
}

/* Room list */
.room-list {
  list-style: none;
  margin: 0;
  padding: 0 24px 64px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.room-card {
  display: flex;
  background: #1a1a1a;
  cursor: pointer;
  overflow: hidden;
  transition: opacity 0.2s;
}

.room-card:hover {
  opacity: 0.88;
}

.card-image-wrap {
  width: 220px;
  flex-shrink: 0;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.room-card:hover .card-image {
  transform: scale(1.03);
}

.card-body {
  flex: 1;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}

.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.card-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 20px;
  font-weight: 400;
  font-style: italic;
  color: #f5f0e8;
  margin: 0;
  line-height: 1.3;
}

.card-price {
  font-size: 18px;
  font-weight: 600;
  color: #c9a96e;
  white-space: nowrap;
  flex-shrink: 0;
}

.per-night {
  font-size: 12px;
  font-weight: 400;
  color: #a0998a;
}

.card-description {
  font-size: 14px;
  color: #a0998a;
  margin: 0;
  line-height: 1.6;
}

.card-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #8a8278;
  letter-spacing: 0.04em;
}

.card-extras {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 2px;
}

.extra-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #a0998a;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 3px 8px;
  border-radius: 4px;
}

.extra-icon {
  font-size: 13px;
  color: #c9a96e;
}

/* Mobile: stack image on top */
@media (max-width: 640px) {
  .room-list {
    padding: 0 16px 48px;
  }

  .room-card {
    flex-direction: column;
  }

  .card-image-wrap {
    width: 100%;
    height: 180px;
  }

  .card-body {
    padding: 16px;
  }
}

@media (min-width: 768px) {
  .rooms-header {
    padding: 56px 40px 32px;
  }

  .room-list {
    padding: 0 40px 80px;
  }

  .card-image-wrap {
    width: 260px;
  }

  .section-heading {
    font-size: 48px;
  }
}

@media (min-width: 1024px) {
  .rooms-header {
    padding: 64px 64px 32px;
  }

  .room-list {
    padding: 0 64px 80px;
  }

  .card-image-wrap {
    width: 300px;
  }

  .section-heading {
    font-size: 56px;
  }
}
</style>
