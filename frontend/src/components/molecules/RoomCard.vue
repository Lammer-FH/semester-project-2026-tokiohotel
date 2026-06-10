<template>
  <article class="room-card" :class="`size-${size}`" @click="navigateToRoom">
    <div class="card-image-wrap">
      <img :src="imageUrl" :alt="room.roomType?.title" class="card-image" />
    </div>

    <div class="card-body">
      <div class="card-top">
        <div class="card-title-group">
          <h2 class="card-title">{{ room.roomType?.title }}</h2>
          <AvailabilityBadge :status="availabilityStatus" />
        </div>

        <span class="card-price">
          €{{ room.roomType?.cost?.toFixed(2) }}
          <span class="per-night"> / Nacht</span>
        </span>
      </div>

      <p class="card-description">
        {{ room.roomType?.description }}
      </p>

      <div class="card-meta">
        <span class="meta-capacity">{{ room.roomType?.capacity }} Personen</span>
        <span class="meta-room-number">Zimmer {{ room.roomNumber }}</span>
      </div>

      <div v-if="visibleExtras.length > 0" class="card-extras">
        <span
          v-for="extra in visibleExtras"
          :key="extra.id ?? extra.icon"
          class="extra-chip"
        >
          <ion-icon :name="extra.icon" class="extra-icon" />
          {{ extra.name }}
        </span>

        <span v-if="hasOverflow" class="extras-overflow">...</span>
      </div>

      <div class="card-actions">
        <button
          type="button"
          class="book-btn"
          :disabled="isUnavailable"
          @click.stop="navigateToBooking"
        >
          {{ isUnavailable ? 'Nicht verfügbar' : 'Buchen' }}
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { IonIcon } from '@ionic/vue';
import type { Room } from '@/types/api';
import AvailabilityBadge from '@/components/atoms/AvailabilityBadge.vue';

type AvailabilityStatus = 'available' | 'unavailable' | 'unknown' | 'loading';

const props = withDefaults(
  defineProps<{
    room: Room;
    size?: 'large' | 'normal' | 'tall';
    availabilityStatus?: AvailabilityStatus;
  }>(),
  {
    size: 'normal',
    availabilityStatus: 'unknown',
  },
);

const router = useRouter();

const isUnavailable = computed(
  () => props.availabilityStatus === 'unavailable',
);

const imageUrl = computed(() => {
  const images = props.room.roomType?.images as string[] | string | undefined;

  if (Array.isArray(images) && images.length > 0) {
    return images[0];
  }

  if (typeof images === 'string' && images.length > 0) {
    return images;
  }

  return `https://placehold.co/600x400?text=${encodeURIComponent(
    props.room.roomType?.title ?? 'Room',
  )}`;
});

const extras = computed(() => props.room.roomType?.extras ?? []);

const hasOverflow = computed(() => extras.value.length > 5);

const visibleExtras = computed(() =>
  hasOverflow.value ? extras.value.slice(0, 4) : extras.value,
);

function navigateToRoom() {
  if (props.room.id != null) {
    router.push({
      path: `/rooms/${props.room.id}`,
      query: router.currentRoute.value.query,
    });
  }
}

function navigateToBooking() {
  if (props.room.id != null && !isUnavailable.value) {
    router.push(`/rooms/${props.room.id}/book`);
  }
}
</script>

<style scoped>
.room-card {
  display: flex;
  background: #1a1a1a;
  cursor: pointer;
  overflow: hidden;
  transition: opacity 0.2s;
  width: 100%;
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

.card-title-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
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

.extras-overflow {
  font-size: 12px;
  color: #8a8278;
  line-height: 1;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  padding-top: 8px;
}

.book-btn {
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

.book-btn:hover {
  background: #c9a96e;
  color: #111111;
}

.book-btn:disabled {
  color: #8a8278;
  border-color: rgba(255, 255, 255, 0.15);
  cursor: not-allowed;
}

.book-btn:disabled:hover {
  background: transparent;
  color: #8a8278;
}

/* Mobile: stack image on top */
@media (max-width: 640px) {
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

  .card-top {
    flex-direction: column;
  }

  .card-price {
    font-size: 16px;
  }
}

@media (min-width: 768px) {
  .card-image-wrap {
    width: 260px;
  }
}

@media (min-width: 1024px) {
  .card-image-wrap {
    width: 300px;
  }
}
</style>