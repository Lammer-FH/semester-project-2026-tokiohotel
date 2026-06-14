<template>
  <div class="edit-group">
    <span class="edit-group-label">Zimmer ändern</span>

    <div v-if="loading" class="edit-rooms-state">
      Zimmer werden geladen…
    </div>
    <div v-else-if="rooms.length === 0" class="edit-rooms-state">
      Keine Zimmer gefunden.
    </div>
    <div v-else class="edit-room-list">
      <div
        v-for="r in rooms"
        :key="r.id"
        class="edit-room-item"
        :class="{
          'edit-room-item--selected': r.id === selectedRoomId,
          'edit-room-item--unavailable': getAvailability(r.id) === 'unavailable',
        }"
        @click.stop.prevent="$emit('select', r)"
      >
        <div v-if="r.id === selectedRoomId" class="selected-indicator">
          Ausgewählt
        </div>
        <RoomCard
          :room="r"
          :availability-status="getAvailability(r.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Room } from '@/types/api';
import RoomCard from '@/components/molecules/RoomCard.vue';

type AvailabilityStatus = 'available' | 'unavailable' | 'unknown' | 'loading';

defineProps<{
  rooms: Room[];
  loading: boolean;
  selectedRoomId?: number;
  getAvailability: (id: number | undefined) => AvailabilityStatus;
}>();

defineEmits<{
  select: [room: Room];
}>();
</script>

<style scoped>
.edit-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #1a1a1a;
  padding: 24px;
}

.edit-group-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #c9a96e;
  font-weight: 700;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.edit-rooms-state {
  color: #a0998a;
  font-size: 14px;
  padding: 16px 0;
}

.edit-room-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 500px;
  overflow-y: auto;
}

.edit-room-item {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.15s;
}

.edit-room-item :deep(.room-card) {
  pointer-events: none;
}

.edit-room-item--selected {
  border-color: #c9a96e;
}

.edit-room-item--unavailable {
  opacity: 0.5;
  cursor: not-allowed;
}

.selected-indicator {
  background: #c9a96e;
  color: #111111;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 6px 12px;
  text-align: center;
}
</style>
