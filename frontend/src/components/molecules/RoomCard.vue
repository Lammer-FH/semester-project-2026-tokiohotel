<template>
  <article class="room-card" @click="navigateToRoom">
    <div class="card-image-wrap">
      <img :src="imageUrl" :alt="room.room_type?.title" class="card-image" />
    </div>
    <div class="card-info">
      <div class="card-info-top">
        <h3 class="card-title">{{ room.room_type?.title }}</h3>
        <span class="card-cta">
          <span class="card-cta-label">Entdecken </span>→
        </span>
      </div>
      <span class="card-capacity">{{ room.room_type?.capacity }} Personen</span>
      <div v-if="visibleExtras.length > 0" class="card-extras">
        <ion-icon
          v-for="extra in visibleExtras"
          :key="extra.icon"
          :name="extra.icon"
          class="extra-icon"
        />
        <span v-if="hasOverflow" class="extras-overflow">...</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { IonIcon } from '@ionic/vue';
import type { Room } from '@/types/api';

const props = defineProps<{
  room: Room;
  size: 'large' | 'normal' | 'tall';
}>();

const router = useRouter();

const imageUrl = computed(
  () => props.room.room_type?.images?.[0] ?? `/images/rooms/${props.room.id ?? 0}.jpg`,
);

const extras = computed(() => props.room.room_type?.extras ?? []);

const hasOverflow = computed(() => extras.value.length > 5);

const visibleExtras = computed(() =>
  hasOverflow.value ? extras.value.slice(0, 4) : extras.value,
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
  min-width: 0;
  width: 100%;
}

.card-image-wrap {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  flex-shrink: 0;
}

.room-card.size-large .card-image-wrap {
  aspect-ratio: 3 / 2;
}

.room-card.size-tall .card-image-wrap {
  aspect-ratio: 1 / 1;
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
  flex-direction: column;
  background: #f5f0e8;
  padding: 10px 12px;
  flex-shrink: 0;
  gap: 4px;
}

/* Row 1: title + arrow */
.card-info-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 6px;
}

.card-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 13px;
  font-weight: 400;
  font-style: italic;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.3;
  flex: 1;
  min-width: 0;
}

.card-cta {
  font-size: 14px;
  color: #c9a96e;
  flex-shrink: 0;
  line-height: 1.3;
}

.card-cta-label {
  display: none;
}

/* Row 2: capacity */
.card-capacity {
  font-size: 11px;
  color: #8a8278;
  letter-spacing: 0.04em;
}

/* Row 3: extras */
.card-extras {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.extra-icon {
  font-size: 18px;
  color: #c9a96e;
}

.extras-overflow {
  font-size: 12px;
  color: #8a8278;
  line-height: 1;
}

/* Tablet */
@media (min-width: 768px) {
  .card-info {
    padding: 12px 16px;
    gap: 5px;
  }

  .card-title {
    font-size: 15px;
  }

  .card-cta {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .card-cta-label {
    display: inline;
  }
}

/* Desktop: grid rows are fixed heights, so let image fill remaining space */
@media (min-width: 1024px) {
  .card-image-wrap {
    aspect-ratio: unset;
    flex: 1;
    min-height: 0;
  }

  .room-card.size-large .card-image-wrap,
  .room-card.size-tall .card-image-wrap {
    aspect-ratio: unset;
    flex: 1;
  }
}
</style>
