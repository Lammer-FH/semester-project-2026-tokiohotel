<template>
  <div class="booking-bar">
    <!-- Check-in trigger -->
    <div class="booking-field date-trigger" @click="openPicker">
      <span class="field-label">Check-in</span>
      <span class="date-value">{{ formattedCheckIn }}</span>
    </div>

    <div class="booking-divider" />

    <!-- Check-out trigger (same picker) -->
    <div class="booking-field date-trigger" @click="openPicker">
      <span class="field-label">Check-out</span>
      <span class="date-value">{{ formattedCheckOut }}</span>
    </div>

    <div class="booking-divider" />

    <!-- Room type filter -->
    <div class="booking-field">
      <span class="field-label">Zimmertyp</span>
      <ion-select
        v-model="roomType"
        interface="popover"
        placeholder="Alle Zimmer"
        class="field-select"
      >
        <ion-select-option value="">Alle Zimmer</ion-select-option>
        <ion-select-option value="Standard Room">Standard Room</ion-select-option>
        <ion-select-option value="Double Room">Double Room</ion-select-option>
        <ion-select-option value="Deluxe">Deluxe</ion-select-option>
        <ion-select-option value="Suite">Suite</ion-select-option>
        <ion-select-option value="Family Room">Family Room</ion-select-option>
      </ion-select>
    </div>

    <div class="booking-action">
      <ion-button class="search-btn" @click="search">Zimmer suchen</ion-button>
    </div>

    <!-- Single date-range picker modal -->
    <ion-modal
      :is-open="isPickerOpen"
      :keep-contents-mounted="true"
      class="picker-modal"
      @did-dismiss="isPickerOpen = false"
    >
      <DateRangePicker @close="isPickerOpen = false" />
    </ion-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { IonModal, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';
import DateRangePicker from '@/components/molecules/DateRangePicker.vue';
import { useRoomStore } from '@/stores/roomStore';

const router = useRouter();
const store = useRoomStore();

const isPickerOpen = ref(false);
const roomType = ref('');

function openPicker() {
  isPickerOpen.value = true;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const formattedCheckIn = computed(() => formatDate(store.checkIn));
const formattedCheckOut = computed(() => formatDate(store.checkOut));

function search() {
  const query: Record<string, string> = {
    startDate: store.checkIn,
    endDate: store.checkOut,
  };
  if (roomType.value) query.roomType = roomType.value;
  router.push({ path: '/rooms', query });
}
</script>

<style scoped>
.booking-bar {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 18px 24px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 16px;
}

.booking-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
  min-width: 0;
}

.date-trigger {
  cursor: pointer;
  user-select: none;
}

.date-trigger:hover .date-value {
  color: rgba(255, 255, 255, 0.8);
}

.field-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 700;
}

.date-value {
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.15s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* IonSelect */
.field-select {
  --color: #ffffff;
  --placeholder-color: rgba(255, 255, 255, 0.7);
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  min-height: auto;
}

.booking-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
}

.booking-action {
  flex-shrink: 0;
}

.search-btn {
  --background: transparent;
  --background-activated: rgba(201, 169, 110, 0.12);
  --background-hover: rgba(201, 169, 110, 0.08);
  --color: #c9a96e;
  --border-radius: 0;
  --border-color: #c9a96e;
  --border-width: 1px;
  --border-style: solid;
  --box-shadow: none;
  --padding-start: 28px;
  --padding-end: 28px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  height: 46px;
}

@media (max-width: 640px) {
  .booking-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
    padding: 16px 18px;
  }

  .booking-divider {
    width: 100%;
    height: 1px;
  }

  .search-btn {
    width: 100%;
  }
}
</style>
