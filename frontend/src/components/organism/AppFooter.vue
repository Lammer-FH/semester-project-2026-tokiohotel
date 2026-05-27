<template>
  <footer class="app-footer">
    <div class="footer-divider" />

    <div class="footer-columns">
      <div class="footer-col">
        <span class="footer-brand">Tokio Hotel</span>
        <p class="footer-tagline">Ein Ort abseits der Welt.</p>
        <address class="footer-address">
          Kärntner Ring 12<br />
          1010 Wien, Austria
        </address>
      </div>

      <div class="footer-col">
        <span class="footer-col-label">Navigation</span>
        <nav class="footer-nav">
          <a class="footer-nav-link" @click="router.push('/')">Startseite</a>
          <a class="footer-nav-link" @click="router.push('/rooms')">Zimmer</a>
          <a class="footer-nav-link">Über uns</a>
          <a class="footer-nav-link">Impressum</a>
          <a class="footer-nav-link">Kontakt</a>
        </nav>
      </div>

      <div class="footer-col">
        <span class="footer-col-label">Kontakt</span>
        <a href="mailto:hello@tokiohotel.at" class="footer-contact-link">hello@tokiohotel.at</a>
        <a href="tel:+4315550100" class="footer-contact-link">+43 1 555 0100</a>
      </div>
    </div>

    <div class="footer-bottom">
      <span class="footer-copy">© 2026 Tokio Hotel. Alle Rechte vorbehalten.</span>
      <div class="footer-legal">
        <a class="footer-legal-link">Datenschutz</a>
        <a class="footer-legal-link">Impressum</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped>
.app-footer {
  background: #0d0d0d;
  padding: 0 64px 40px;
}

.footer-divider {
  height: 1px;
  background: #c9a96e;
  margin-bottom: 64px;
  opacity: 0.5;
}

.footer-columns {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 56px;
}

/* --- COL 1 --- */
.footer-brand {
  display: block;
  font-family: Georgia, 'Times New Roman', serif;
  font-style: italic;
  font-size: 22px;
  font-weight: 400;
  color: #c9a96e;
  letter-spacing: 1px;
  margin-bottom: 14px;
}

.footer-tagline {
  font-size: 13px;
  color: #a0998a;
  margin: 0 0 20px;
  line-height: 1.6;
}

.footer-address {
  font-size: 13px;
  font-style: normal;
  color: #a0998a;
  line-height: 1.7;
}

/* --- COL 2 --- */
.footer-col-label {
  display: block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #c9a96e;
  margin-bottom: 20px;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-nav-link {
  font-size: 13px;
  color: #a0998a;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.15s;
}

.footer-nav-link:hover {
  color: #f5f0e8;
}

/* --- COL 3 --- */
.footer-contact-link {
  display: block;
  font-size: 13px;
  color: #a0998a;
  text-decoration: none;
  margin-bottom: 10px;
  transition: color 0.15s;
}

.footer-contact-link:hover {
  color: #f5f0e8;
}

/* --- BOTTOM BAR --- */
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.footer-copy {
  font-size: 12px;
  color: #a0998a;
  opacity: 0.6;
}

.footer-legal {
  display: flex;
  gap: 24px;
}

.footer-legal-link {
  font-size: 12px;
  color: #a0998a;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.15s;
}

.footer-legal-link:hover {
  color: #f5f0e8;
}

/* --- RESPONSIVE --- */
@media (max-width: 768px) {
  .app-footer {
    padding: 0 24px 32px;
  }

  .footer-divider {
    margin-bottom: 40px;
  }

  .footer-columns {
    grid-template-columns: 1fr;
    gap: 36px;
    margin-bottom: 40px;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .app-footer {
    padding: 0 40px 40px;
  }
}
</style>
