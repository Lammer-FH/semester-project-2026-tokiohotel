<template>
  <ion-page>
    <ion-content>
      <AppHeader :dark="true" />
      <div class="detail-placeholder">
        <p>Zimmerdetails folgen.</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import AppHeader from '@/components/organism/AppHeader.vue';
</script>

<style scoped>
.detail-placeholder {
  background: #111111;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a0998a;
  font-size: 16px;
}
</style>
