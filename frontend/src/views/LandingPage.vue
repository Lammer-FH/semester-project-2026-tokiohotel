<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="hero-wrapper">
        <AppHeader />
        <HeroSection />
      </div>
      <AboutSnippet />
      <!-- TODO: room grid removed, moved to separate RoomListPage -->
      <AppFooter />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import AppHeader from '@/components/organism/AppHeader.vue';
import AppFooter from '@/components/organism/AppFooter.vue';
import HeroSection from '@/components/molecules/HeroSection.vue';
import AboutSnippet from '@/components/molecules/AboutSnippet.vue';
</script>

<style scoped>
.hero-wrapper {
  position: relative;
}
</style>
