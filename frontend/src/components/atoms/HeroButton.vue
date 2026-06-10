<template>
  <ion-button :router-link="to" class="hero-btn">
    <slot />
  </ion-button>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue';

defineProps<{
  to: string;
}>();
</script>

<style scoped>
.hero-btn {
  --background: transparent;
  --background-activated: rgba(201, 169, 110, 0.12);
  --background-hover: rgba(201, 169, 110, 0.08);
  --color: #c9a96e;
  --border-radius: 0;
  --border-color: #c9a96e;
  --border-width: 1px;
  --border-style: solid;
  --box-shadow: none;
  --padding-start: 28px;
  --padding-end: 28px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  height: 46px;
  transition: opacity 0.2s;
}
</style>
 