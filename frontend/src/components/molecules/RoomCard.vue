<template>
  <article class="room-card" @click="navigateToRoom">
    <div class="card-image-wrap">
      <img :src="imageUrl" :alt="room.room_type?.title" class="card-image" />
    </div>
    <div class="card-info">
      <div class="card-info-leading">
        <h3 class="card-title">{{ room.room_type?.title }}</h3>
        <span class="card-capacity">{{ room.room_type?.capacity }} Personen</span>
      </div>
      <div class="card-info-trailing">
        <span class="card-cta">Entdecken →</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import type { Room } from '@/types/api';

const props = defineProps<{
  room: Room;
  size: 'large' | 'normal' | 'tall';
}>();

const router = useRouter();

const imageUrl = computed(
  () => props.room.room_type?.images?.[0] ?? `/images/rooms/${props.room.id ?? 0}.jpg`,
);

function navigateToRoom() {
  if (props.room.id != null) {
    router.push(`/rooms/${props.room.id}`);
  }
}
</script>

<style scoped>
.room-card {
  display: flex;
  flex-direction: column;
  background: #1a1a1a;
  cursor: pointer;
  height: 100%;
  overflow: hidden;
}

.card-image-wrap {
  flex: 1;
  overflow: hidden;
  min-height: 180px;
}

.room-card.size-large .card-image-wrap {
  min-height: 260px;
}

.room-card.size-tall .card-image-wrap {
  min-height: 220px;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.room-card:hover .card-image {
  transform: scale(1.02);
}

.card-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f5f0e8;
  padding: 12px 16px;
  flex-shrink: 0;
}

.card-info-leading {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.card-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 15px;
  font-weight: 400;
  font-style: italic;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.3;
}

.card-capacity {
  font-size: 11px;
  color: #8a8278;
  letter-spacing: 0.04em;
}

.card-cta {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #c9a96e;
  white-space: nowrap;
}
</style>
