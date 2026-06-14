<template>
  <div class="state-message" :class="{ 'state-message--error': variant === 'error' }">
    <h2 v-if="title">{{ title }}</h2>
    <p v-if="message">{{ message }}</p>
    <button v-if="retryLabel" type="button" class="btn-outline" @click="$emit('retry')">
      {{ retryLabel }}
    </button>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    message?: string;
    retryLabel?: string;
    variant?: 'default' | 'error';
  }>(),
  { variant: 'default' },
);

defineEmits<{ retry: [] }>();
</script>
