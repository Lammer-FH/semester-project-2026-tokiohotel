<template>
  <span class="availability-badge" :class="badgeClass">
    <span class="status-dot" />
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type AvailabilityStatus = 'available' | 'unavailable' | 'unknown' | 'loading';

const props = withDefaults(
  defineProps<{
    status?: AvailabilityStatus;
  }>(),
  {
    status: 'unknown',
  }
);

const label = computed(() => {
  switch (props.status) {
    case 'available':
      return 'Verfügbar';
    case 'unavailable':
      return 'Nicht verfügbar';
    case 'loading':
      return 'Wird geprüft';
    default:
      return 'Verfügbarkeit prüfen';
  }
});

const badgeClass = computed(() => `availability-badge--${props.status}`);
</script>

<style scoped>
.availability-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.availability-badge--available {
  color: #d8f3dc;
  background: rgba(64, 145, 108, 0.18);
  border: 1px solid rgba(64, 145, 108, 0.45);
}

.availability-badge--available .status-dot {
  background: #74c69d;
}

.availability-badge--unavailable {
  color: #ffd6d6;
  background: rgba(160, 60, 60, 0.18);
  border: 1px solid rgba(160, 60, 60, 0.45);
}

.availability-badge--unavailable .status-dot {
  background: #ff8a8a;
}

.availability-badge--unknown {
  color: #ead8b8;
  background: rgba(201, 169, 110, 0.14);
  border: 1px solid rgba(201, 169, 110, 0.35);
}

.availability-badge--unknown .status-dot {
  background: #c9a96e;
}

.availability-badge--loading {
  color: #d7d7d7;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.availability-badge--loading .status-dot {
  background: #d7d7d7;
}
</style>