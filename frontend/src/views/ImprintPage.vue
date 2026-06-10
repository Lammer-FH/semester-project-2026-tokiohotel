<template>
  <ion-page>
    <ion-content fullscreen>
      <AppHeader :dark="true" />

      <main class="imprint-page">
        <section class="imprint-hero">
          <span class="eyebrow">Impressum</span>
          <h1>Rechtliche Informationen</h1>
          <p>
            Angaben gemäß den gesetzlichen Informationspflichten für das Tokio Hotel.
          </p>
        </section>

        <section class="imprint-content">
          <div class="info-card">
            <span class="card-label">Betreiber</span>
            <h2>Tokio Hotel</h2>
            <p>
              Opern Ring 2<br />
              1010 Wien<br />
              Österreich
            </p>
          </div>

          <div class="info-card">
            <span class="card-label">Kontakt</span>
            <h2>Kontaktaufnahme</h2>
            <p>
              E-Mail:
              <a href="mailto:hello@tokiohotel.at">hello@tokiohotel.at</a><br />
              Telefon:
              <a href="tel:+4315550100">+43 1 555 0100</a>
            </p>
          </div>

          <div class="info-card">
            <span class="card-label">Projekt</span>
            <h2>Hinweis</h2>
            <p>
              Diese Website wurde im Rahmen eines studentischen Projekts erstellt.
              Die dargestellten Inhalte dienen ausschließlich Demonstrationszwecken.
            </p>
          </div>

          <div class="info-card">
            <span class="card-label">Haftung</span>
            <h2>Haftungsausschluss</h2>
            <p>
              Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung
              für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten
              Informationen.
            </p>
          </div>
        </section>
      </main>
      <AppFooter />
      
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import AppHeader from '@/components/organism/AppHeader.vue';
import AppFooter from '@/components/organism/AppFooter.vue';
</script>

<style scoped>
.imprint-page {
  min-height: 100vh;
  background: #0d0d0d;
  color: #f5f0e8;
  padding: 96px 28px 64px;
}

.imprint-hero {
  max-width: 900px;
  margin-bottom: 72px;
}

.eyebrow,
.card-label {
  display: inline-block;
  color: #c9a96e;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin-bottom: 22px;
}

h1,
h2 {
  font-family: Georgia, 'Times New Roman', serif;
  font-style: italic;
  font-weight: 400;
  line-height: 1.15;
  margin: 0;
}

h1 {
  font-size: clamp(44px, 6vw, 84px);
  margin-bottom: 28px;
}

h2 {
  font-size: 28px;
  margin-bottom: 20px;
}

p {
  color: #c8bca9;
  line-height: 1.8;
  font-size: 15px;
  margin: 0;
}

a {
  color: #c9a96e;
  text-decoration: none;
}

a:hover {
  color: #f5f0e8;
}

.imprint-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  max-width: 1100px;
}

.info-card {
  border-top: 1px solid rgba(201, 169, 110, 0.45);
  background: rgba(255, 255, 255, 0.025);
  padding: 32px;
}

@media (min-width: 768px) {
  .imprint-page {
    padding: 80px 40px 112px;
  }
}

@media (min-width: 1024px) {
  .imprint-page {
    padding: 96px 64px 128px;
  }
}

@media (max-width: 768px) {
  .imprint-content {
    grid-template-columns: 1fr;
  }
}
</style>