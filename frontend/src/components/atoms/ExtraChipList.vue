<template>
  <div v-if="extras.length" class="extra-chip-list">
    <span v-for="extra in visibleExtras" :key="extra.id ?? extra.icon" class="extra-chip">
      <ion-icon :name="extra.icon" class="extra-icon" />
      {{ extra.name }}
    </span>
    <span v-if="hasOverflow" class="extras-overflow">...</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IonIcon } from '@ionic/vue';
import type { Extra } from '@/types/api';

const props = withDefaults(
  defineProps<{
    extras: Extra[];
    max?: number;
  }>(),
  { max: 0 },
);

const hasOverflow = computed(() => props.max > 0 && props.extras.length > props.max);

const visibleExtras = computed(() =>
  hasOverflow.value ? props.extras.slice(0, props.max) : props.extras,
);
</script>

<style scoped>
.extra-chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.extras-overflow {
  font-size: 12px;
  color: #8a8278;
  line-height: 1;
}
</style>
