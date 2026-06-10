<template>
  <ion-page>
    <ion-content :fullscreen="false" class="dark-page">
      <AppHeader :dark="true" />

      <div class="rooms-page">
        <header class="rooms-header">
          <h1 class="section-heading heading-serif">Verfügbare Zimmer</h1>

          <button
            type="button"
            class="timeframe-trigger"
            @click="isPickerOpen = true"
          >
            <ion-icon name="calendar-outline" class="filter-cal-icon" />
            <span class="timeframe-text">{{ timeframeLabel }}</span>
            <span class="timeframe-edit">Ändern</span>
          </button>

          <p v-if="roomTypeFilter" class="filter-summary">
            {{ roomTypeFilter }}
          </p>
        </header>

        <StateMessage
          v-if="store.loading"
          message="Zimmer werden geladen…"
        />

        <StateMessage
          v-else-if="store.error"
          variant="error"
          title="Zimmer konnten nicht geladen werden"
          message="Bitte prüfen Sie Ihre Verbindung oder versuchen Sie es später erneut."
          retry-label="Erneut versuchen"
          @retry="loadRooms"
        />

        <StateMessage
          v-else-if="filteredRooms.length === 0"
          message="Keine Zimmer für Ihre Anfrage gefunden."
        />

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
            class="btn-outline"
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
            class="btn-outline"
            :disabled="currentPage >= totalPages - 1"
            @click="goToPage(currentPage + 1)"
          >
            Nächste
          </button>
        </nav>

        <!-- Date-range picker modal -->
        <ion-modal
          :is-open="isPickerOpen"
          :keep-contents-mounted="true"
          class="picker-modal"
          @did-dismiss="onPickerDismiss"
        >
          <DateRangePicker @close="isPickerOpen = false" />
        </ion-modal>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IonPage, IonContent, IonIcon, IonModal } from '@ionic/vue';
import AppHeader from '@/components/organism/AppHeader.vue';
import StateMessage from '@/components/atoms/StateMessage.vue';
import RoomCard from '@/components/molecules/RoomCard.vue';
import DateRangePicker from '@/components/molecules/DateRangePicker.vue';
import { useRoomStore } from '@/stores/roomStore';

const route = useRoute();
const router = useRouter();
const store = useRoomStore();

const startDate = computed(() => route.query.startDate as string | undefined);
const endDate = computed(() => route.query.endDate as string | undefined);
const roomTypeFilter = computed(
  () => route.query.roomType as string | undefined,
);

const isPickerOpen = ref(false);

// Keep the shared store (which the picker reads/writes) in sync with the URL,
// so opening the picker shows the dates currently reflected in the list.
if (startDate.value && endDate.value) {
  store.setDates(startDate.value, endDate.value);
}

// When the picker closes, push the newly chosen dates into the URL. The existing
// watch on [startDate, endDate] then refetches rooms + availability.
function onPickerDismiss() {
  isPickerOpen.value = false;
  const ci = store.checkIn;
  const co = store.checkOut;
  if (ci && co && (ci !== startDate.value || co !== endDate.value)) {
    router.push({
      path: '/rooms',
      query: { ...route.query, startDate: ci, endDate: co, page: '0' },
    });
  }
}

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

const timeframeLabel = computed(() => {
  const ci = store.checkIn;
  const co = store.checkOut;
  if (ci && co) return `${fmtDate(ci)} → ${fmtDate(co)}`;
  return 'Zeitraum wählen';
});

async function loadRooms() {
  await store.fetchRooms({
    page: currentPage.value,
    size: 5,
  });
  // Use the store dates (which always hold a default) instead of URL query
  if (store.checkIn && store.checkOut) {
    await store.fetchAvailableRoomIds(store.checkIn, store.checkOut);
  }
}

onMounted(loadRooms);
watch([startDate, endDate, currentPage], loadRooms);
</script>

<style scoped>
.rooms-page {
  min-height: 100vh;
}

.rooms-header {
  padding: 48px 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-heading {
  font-size: 36px;
  margin: 0;
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

.timeframe-trigger {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 1px solid rgba(201, 169, 110, 0.4);
  color: #c9a96e;
  padding: 8px 14px;
  font-size: 13px;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition:
    background 0.15s,
    border-color 0.15s;
}

.timeframe-trigger:hover {
  background: rgba(201, 169, 110, 0.1);
  border-color: #c9a96e;
}

.timeframe-text {
  font-weight: 500;
  white-space: nowrap;
}

.timeframe-edit {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 700;
  opacity: 0.7;
  border-left: 1px solid rgba(201, 169, 110, 0.4);
  padding-left: 8px;
}

.picker-modal {
  --width: min(400px, 100%);
  --height: min(560px, 92vh);
  --border-radius: 20px;
  --box-shadow: 0 24px 64px rgba(0, 0, 0, 0.65);
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

.page-indicator {
  color: #a0998a;
  font-size: 13px;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .room-list {
    padding: 0 16px 32px;
  }

  .pagination {
    flex-direction: column;
    gap: 12px;
  }

  .picker-modal {
    --width: 100%;
    --height: 88vh;
    --border-radius: 20px 20px 0 0;
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
    margin-bottom: 32px;
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
