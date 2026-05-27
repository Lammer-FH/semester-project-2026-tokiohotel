<template>
  <div class="booking-bar">
    <div class="booking-field">
      <label class="field-label">Check-in</label>
      <ion-datetime-button datetime="booking-checkin" class="date-btn" />
      <ion-modal :keep-contents-mounted="true">
        <ion-datetime
          id="booking-checkin"
          v-model="checkIn"
          presentation="date"
          locale="de-DE"
          :first-day-of-week="1"
        />
      </ion-modal>
    </div>
    <div class="booking-divider" />
    <div class="booking-field">
      <label class="field-label">Zimmertyp</label>
      <ion-select
        v-model="roomType"
        interface="popover"
        placeholder="Alle Zimmer"
        class="field-select"
      >
        <ion-select-option value="">Alle Zimmer</ion-select-option>
        <ion-select-option value="standard">Standard Doppelzimmer</ion-select-option>
        <ion-select-option value="deluxe">Deluxe Suite</ion-select-option>
        <ion-select-option value="penthouse">Penthouse</ion-select-option>
      </ion-select>
    </div>
    <div class="booking-action">
      <HeroButton to="/tabs/tab2">Zimmer ansehen</HeroButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonSelect,
  IonSelectOption,
} from '@ionic/vue';
import HeroButton from '@/components/atoms/HeroButton.vue';

const checkIn = ref('');
const roomType = ref('');
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

.field-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 700;
}

/* IonDatetimeButton */
.date-btn::part(native) {
  background: transparent;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  padding: 0;
  box-shadow: none;
  border: none;
  height: auto;
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

  .booking-action ion-button {
    width: 100%;
  }
}
</style>
