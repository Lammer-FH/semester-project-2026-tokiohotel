<template>
  <header class="app-header" :class="{ 'is-dark': dark }">
    <div class="header-spacer" />
    <span class="header-logo">Tokio Hotel</span>
    <nav class="header-nav">
      <a class="nav-link" @click="router.push('/tabs/tab3')">Kontakt</a>
      <a class="nav-link" @click="router.push('/tabs/tab2')">Zimmer</a>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

withDefaults(defineProps<{ dark?: boolean }>(), { dark: false });

const router = useRouter();
</script>

<style scoped>
.app-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 28px;
  background: transparent;
}

.app-header.is-dark {
  position: sticky;
  background: #111111;
  border-bottom: 1px solid rgba(201, 169, 110, 0.15);
}

.header-spacer {
  flex: 1;
}

.header-logo {
  flex: 1;
  text-align: center;
  font-family: Georgia, 'Times New Roman', serif;
  font-style: italic;
  font-size: 20px;
  font-weight: 400;
  color: #ffffff;
  letter-spacing: 1.5px;
  white-space: nowrap;
}

.header-nav {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 28px;
}

.nav-link {
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.88);
  text-decoration: none;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.15s;
}

.nav-link:hover {
  color: #ffffff;
}

@media (max-width: 480px) {
  .header-spacer {
    display: none;
  }

  .header-nav {
    display: none;
  }

  .header-logo {
    text-align: left;
    flex: unset;
  }
}
</style>
