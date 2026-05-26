<template>
  <section class="room-teaser">
    <div class="teaser-header">
      <div class="teaser-header-left">
        <span class="section-label">UNSERE ZIMMER</span>
        <h2 class="teaser-heading">Handverlesene Räume</h2>
      </div>
      <a class="teaser-view-all" @click="router.push('/tabs/tab2')">ALLE ZIMMER ANSEHEN →</a>
    </div>

    <div class="teaser-grid">
      <div v-for="room in rooms" :key="room.number" class="room-card">
        <div class="card-image-wrap">
          <img :src="room.image" :alt="room.title" class="card-image" />
        </div>
        <div class="card-body">
          <span class="card-number">{{ room.number }}</span>
          <h3 class="card-title">{{ room.title }}</h3>
          <p class="card-desc">{{ room.description }}</p>
          <a class="card-link">ENTDECKEN →</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const rooms = [
  {
    number: '01.',
    title: 'GARTEN SUITE',
    description: 'Ein Rückzugsort im Erdgeschoss mit privater Terrasse und Gartenblick.',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=85',
  },
  {
    number: '02.',
    title: 'DELUXE ZIMMER',
    description: 'Warme Materialien und durchdachtes Licht für einen tief erholsamen Aufenthalt.',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=85',
  },
  {
    number: '03.',
    title: 'GIPFEL LOFT',
    description: 'Offenes Wohnen in der Höhe mit Panoramablick über die Stadt.',
    image: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=85',
  },
];
</script>

<style scoped>
.room-teaser {
  background: #1a1a1a;
  padding: 80px 64px;
}

.teaser-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 48px;
}

.teaser-header-left {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.section-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: #c9a96e;
  text-transform: uppercase;
}

.teaser-heading {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 38px;
  font-weight: 400;
  font-style: italic;
  color: #f5f0e8;
  margin: 0;
  line-height: 1.2;
}

.teaser-view-all {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #c9a96e;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  padding-bottom: 4px;
  transition: opacity 0.2s;
  white-space: nowrap;
}

.teaser-view-all:hover {
  opacity: 0.7;
}

/* --- GRID --- */
.teaser-grid {
  display: flex;
  gap: 24px;
}

.room-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #111111;
  border: 1px solid transparent;
  transition: border-color 0.25s;
  cursor: pointer;
  overflow: hidden;
}

.room-card:hover {
  border-color: #c9a96e;
}

.card-image-wrap {
  overflow: hidden;
  height: 260px;
  flex-shrink: 0;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.room-card:hover .card-image {
  transform: scale(1.04);
}

.card-body {
  padding: 28px 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-number {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 13px;
  color: #c9a96e;
  letter-spacing: 0.06em;
}

.card-title {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #f5f0e8;
  margin: 0;
  text-transform: uppercase;
}

.card-desc {
  font-size: 13px;
  line-height: 1.65;
  color: #a0998a;
  margin: 0;
  flex: 1;
}

.card-link {
  display: inline-block;
  margin-top: 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #c9a96e;
  text-transform: uppercase;
  text-decoration: none;
  transition: opacity 0.2s;
}

.card-link:hover {
  opacity: 0.7;
}

/* --- MOBILE: horizontal scroll snap --- */
@media (max-width: 768px) {
  .room-teaser {
    padding: 56px 0 56px 24px;
  }

  .teaser-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 32px;
    padding-right: 24px;
  }

  .teaser-heading {
    font-size: 28px;
  }

  .teaser-grid {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding-right: 24px;
    gap: 16px;
    /* hide scrollbar */
    scrollbar-width: none;
  }

  .teaser-grid::-webkit-scrollbar {
    display: none;
  }

  .room-card {
    min-width: 280px;
    flex-shrink: 0;
    scroll-snap-align: start;
  }

  .card-image-wrap {
    height: 200px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .room-teaser {
    padding: 64px 40px;
  }

  .card-image-wrap {
    height: 220px;
  }
}
</style>
