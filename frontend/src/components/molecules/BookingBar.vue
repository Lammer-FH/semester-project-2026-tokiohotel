<template>
  <div class="booking-bar">
    <div class="booking-field">
      <label class="field-label">Check-in</label>
      <input type="date" v-model="checkIn" class="field-input" />
    </div>
    <div class="booking-divider" />
    <div class="booking-field">
      <label class="field-label">Zimmertyp</label>
      <select v-model="roomType" class="field-input field-select">
        <option value="">Alle Zimmer</option>
        <option value="standard">Standard Doppelzimmer</option>
        <option value="deluxe">Deluxe Suite</option>
        <option value="penthouse">Penthouse</option>
      </select>
    </div>
    <div class="booking-action">
      <HeroButton to="/tabs/tab2">Zimmer ansehen</HeroButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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

.field-input {
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  cursor: pointer;
  padding: 0;
}

.field-input option {
  color: #111;
  background: #fff;
}

.field-input::-webkit-calendar-picker-indicator {
  filter: invert(1) opacity(0.7);
  cursor: pointer;
}

.field-select {
  appearance: none;
  -webkit-appearance: none;
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
