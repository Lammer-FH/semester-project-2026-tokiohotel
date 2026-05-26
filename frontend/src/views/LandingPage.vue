<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="hero-wrapper">
        <AppHeader />
        <HeroSection />
      </div>
      <AboutSnippet />
      <section class="rooms-section">
        <header class="rooms-section-header">
          <h2 class="section-heading">Unsere Zimmer</h2>
        </header>
        <RoomGrid :rooms="rooms" />
      </section>
      <AppFooter />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import AppHeader from '@/components/organism/AppHeader.vue';
import AppFooter from '@/components/organism/AppFooter.vue';
import HeroSection from '@/components/molecules/HeroSection.vue';
import AboutSnippet from '@/components/molecules/AboutSnippet.vue';
import RoomGrid from '@/components/organism/RoomGrid.vue';
import { useRoomStore } from '@/stores/roomStore';
import { mockRooms } from '@/mocks/roomMocks';

const store = useRoomStore();
const rooms = computed(() => (store.rooms.length > 0 ? store.rooms : mockRooms));

onMounted(() => {
  store.fetchRooms();
});
</script>

<style scoped>
.hero-wrapper {
  position: relative;
}

.rooms-section {
  background: #111111;
}

.rooms-section-header {
  padding: 64px 24px 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #c9a96e;
}

.section-heading {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 36px;
  font-weight: 400;
  font-style: italic;
  color: #f5f0e8;
  margin: 0;
  line-height: 1.2;
}

@media (min-width: 768px) {
  .rooms-section-header {
    padding: 72px 40px 48px;
  }

  .section-heading {
    font-size: 48px;
  }
}

@media (min-width: 1024px) {
  .rooms-section-header {
    padding: 80px 64px 52px;
  }

  .section-heading {
    font-size: 56px;
  }
}
</style>
