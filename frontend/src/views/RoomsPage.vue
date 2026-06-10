<template>
  <ion-page>
    <ion-content :fullscreen="false">
      <AppHeader :dark="true" />

      <div class="rooms-page">
        <header class="rooms-header">
          <h1 class="section-heading">Verfügbare Zimmer</h1>

          <p v-if="activeFilters" class="filter-summary">
            <ion-icon name="calendar-outline" class="filter-cal-icon" />
            {{ activeFilters }}
          </p>
        </header>

        <div v-if="store.loading" class="state-message">
          Zimmer werden geladen…
        </div>

        <div v-else-if="store.error" class="state-message state-message--error">
          <h2>Zimmer konnten nicht geladen werden</h2>
          <p>
            Bitte prüfen Sie Ihre Verbindung oder versuchen Sie es später erneut.
          </p>
          <button type="button" class="retry-btn" @click="loadRooms">
            Erneut versuchen
          </button>
        </div>

        <div v-else-if="filteredRooms.length === 0" class="state-message">
          Keine Zimmer für Ihre Anfrage gefunden.
        </div>        

        <ul v-else class="room-list">
          <li
            v-for="room in filteredRooms"
            :key="room.id"
            class="room-card-item"
          >
            <RoomCard
            :room="room"
            size="normal"
            :availability-status="store.getRoomAvailability(room.id)"
          />
          </li>
        </ul>

        <nav v-if="totalPages > 1" class="pagination">
          <button
            type="button"
            class="page-btn"
            :disabled="currentPage === 0"
            @click="goToPage(currentPage - 1)"
          >
            Vorherige
          </button>

          <span class="page-indicator">
            Seite {{ currentPage + 1 }} von {{ totalPages }}
          </span>

          <button
            type="button"
            class="page-btn"
            :disabled="currentPage >= totalPages - 1"
            @click="goToPage(currentPage + 1)"
          >
            Nächste
          </button>
        </nav>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
import AppHeader from '@/components/organism/AppHeader.vue';
import RoomCard from '@/components/molecules/RoomCard.vue';
import { useRoomStore } from '@/stores/roomStore';

const route = useRoute();
const router = useRouter();
const store = useRoomStore();

const startDate = computed(() => route.query.startDate as string | undefined);
const endDate = computed(() => route.query.endDate as string | undefined);
const roomTypeFilter = computed(() => route.query.roomType as string | undefined);

const currentPage = computed(() => {
  const p = Number(route.query.page);
  return Number.isFinite(p) && p > 0 ? p : 0;
});

const totalPages = computed(() => store.pagination?.totalPages ?? 1);

function goToPage(p: number) {
  router.push({ path: '/rooms', query: { ...route.query, page: String(p) } });
}

const filteredRooms = computed(() => {
  if (!roomTypeFilter.value) return store.rooms;
  return store.rooms.filter((r) => r.roomType?.title === roomTypeFilter.value);
});

const fmt = new Intl.DateTimeFormat('de-AT', {
  weekday: 'short',
  day: 'numeric',
  month: 'long',
});

function fmtDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  return fmt.format(new Date(y, m - 1, d));
}

const activeFilters = computed(() => {
  const parts: string[] = [];

  if (startDate.value) parts.push(fmtDate(startDate.value));
  if (endDate.value) parts.push(fmtDate(endDate.value));
  if (roomTypeFilter.value) parts.push(roomTypeFilter.value);

  return parts.join(' · ') || null;
});

async function loadRooms() {
  await store.fetchRooms({
    page: currentPage.value,
    size: 5,
  });
  if (startDate.value && endDate.value) {
    await store.fetchAvailableRoomIds(startDate.value, endDate.value);
  }
}

onMounted(loadRooms);
watch([startDate, endDate, currentPage], loadRooms);
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
  display: flex;
  align-items: center;
  gap: 6px;
}

.filter-cal-icon {
  font-size: 15px;
  flex-shrink: 0;
}

.state-message {
  padding: 64px 24px;
  text-align: center;
  color: #a0998a;
  font-size: 15px;
}

.room-list {
  list-style: none;
  margin: 0;
  padding: 0 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.room-card-item {
  list-style: none;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 0 0 64px;
}

.page-btn {
  background: transparent;
  color: #c9a96e;
  border: 1px solid #c9a96e;
  padding: 8px 20px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.page-btn:hover:not(:disabled) {
  background: #c9a96e;
  color: #111111;
}

.page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.page-indicator {
  color: #a0998a;
  font-size: 13px;
  letter-spacing: 0.04em;
  white-space: nowrap;
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

@media (max-width: 640px) {
  .room-list {
    padding: 0 16px 32px;
  }

  .pagination {
    flex-direction: column;
    gap: 12px;
  }
}

@media (min-width: 768px) {
  .rooms-header {
    padding: 56px 40px 32px;
  }

  .room-list {
    padding: 0 40px 40px;
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
    padding: 0 64px 40px;
  }

  .section-heading {
    font-size: 56px;
  }
}


</style>