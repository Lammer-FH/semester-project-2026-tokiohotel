<template>
  <section class="hero">
    <div class="hero-overlay" />
    <div class="hero-body">
      <h1 class="hero-title">Tokio Hotel</h1>
    </div>
    <div class="hero-booking">
      <BookingBar />
    </div>
  </section>
</template>

<script setup lang="ts">
import BookingBar from '@/components/molecules/BookingBar.vue';
</script>

<style scoped>
.hero {
  position: relative;
  height: 100svh;
  min-height: 600px;
  background-image: url('https://images.unsplash.com/photo-1565463694786-7fa5cf426096?w=1400&q=85');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.15) 50%,
    rgba(0, 0, 0, 0.55) 100%
  );
}

.hero-body {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-style: italic;
  font-size: 80px;
  font-weight: 400;
  color: #ffffff;
  letter-spacing: 3px;
  text-align: center;
  text-shadow: 0 4px 32px rgba(0, 0, 0, 0.25);
  margin: 0;
}

.hero-booking {
  position: relative;
  width: 100%;
  max-width: 780px;
  padding: 0 20px 48px;
}

@media (max-width: 640px) {
  .hero-title {
    font-size: 48px;
    letter-spacing: 2px;
  }
}
</style>
