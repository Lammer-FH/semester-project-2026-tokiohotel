<template>
  <div class="room-grid">
    <div
      v-for="(room, index) in rooms"
      :key="room.id"
      class="card-wrapper"
    >
      <RoomCard :room="room" :size="cardSizes[index] ?? 'normal'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Room } from '@/types/api';
import RoomCard from '@/components/molecules/RoomCard.vue';

defineProps<{
  rooms: Room[];
}>();

const cardSizes: Array<'large' | 'normal' | 'tall'> = [
  'large',   // card 1 — 2-col hero
  'normal',  // card 2
  'tall',    // card 3
  'normal',  // card 4
  'normal',  // card 5 — 2-col wide
];
</script>

<style scoped>
.room-grid {
  display: grid;
  gap: 12px;
  padding: 0 24px 64px;

  /* Mobile: 2-col */
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    'c1 c1'
    'c2 c3'
    'c4 c4'
    'c5 c5';
}

.card-wrapper:nth-child(1) { grid-area: c1; min-height: 280px; }
.card-wrapper:nth-child(2) { grid-area: c2; min-height: 220px; }
.card-wrapper:nth-child(3) { grid-area: c3; min-height: 220px; }
.card-wrapper:nth-child(4) { grid-area: c4; min-height: 200px; }
.card-wrapper:nth-child(5) { grid-area: c5; min-height: 200px; }

/* Tablet: keep 2-col but taller rows */
@media (min-width: 768px) {
  .room-grid {
    padding: 0 40px 80px;
  }

  .card-wrapper:nth-child(1) { min-height: 340px; }
  .card-wrapper:nth-child(2) { min-height: 260px; }
  .card-wrapper:nth-child(3) { min-height: 260px; }
  .card-wrapper:nth-child(4) { min-height: 240px; }
  .card-wrapper:nth-child(5) { min-height: 240px; }
}

/* Desktop: 3-col masonry */
@media (min-width: 1024px) {
  .room-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 360px 280px 240px;
    grid-template-areas:
      'c1 c1 c2'
      'c1 c1 c3'
      'c4 c5 c5';
    padding: 0 64px 80px;
  }

  /* Reset min-heights — grid-template-rows takes over */
  .card-wrapper:nth-child(1),
  .card-wrapper:nth-child(2),
  .card-wrapper:nth-child(3),
  .card-wrapper:nth-child(4),
  .card-wrapper:nth-child(5) {
    min-height: unset;
  }
}
</style>
