<template>
  <ion-page>
    <ion-content fullscreen>
      <AppHeader :dark="true" />

      <main class="about-page">
        <section class="about-hero">
          <div class="about-copy">
            <span class="eyebrow">Über uns</span>

            <h1>Ein Hotel für stille Momente mitten in Wien</h1>

            <p>
              Das Tokio Hotel ist ein Boutique-Hotel im Herzen Wiens. Unser Ziel ist es,
              Gästen einen ruhigen Rückzugsort zu bieten, der Komfort, Design und
              persönliche Atmosphäre verbindet.
            </p>

            <p>
              Jeder Aufenthalt soll sich unkompliziert, hochwertig und angenehm anfühlen —
              von der Auswahl des passenden Zimmers bis zur Ankunft im Hotel.
            </p>
          </div>

          <div class="about-image" />
        </section>

        <section class="about-section">
          <div class="section-heading">
            <span class="eyebrow">Unsere Philosophie</span>
            <h2>Reduziert, warm und bewusst gestaltet</h2>
          </div>

          <div class="text-grid">
            <article>
              <h3>Ruhige Räume</h3>
              <p>
                Unsere Zimmer sind so gestaltet, dass sie nach einem langen Tag in der Stadt
                Ruhe und Erholung bieten. Klare Formen, warme Farben und ausgewählte Details
                schaffen eine entspannte Atmosphäre.
              </p>
            </article>

            <article>
              <h3>Einfach buchen</h3>
              <p>
                Gäste sollen Zimmer schnell vergleichen, Verfügbarkeiten prüfen und ihren
                Aufenthalt ohne unnötige Hürden buchen können.
              </p>
            </article>

            <article>
              <h3>Zentrale Lage</h3>
              <p>
                Durch die Lage in Wien sind Sehenswürdigkeiten, Restaurants und öffentliche
                Verkehrsmittel gut erreichbar.
              </p>
            </article>
          </div>
        </section>

        <section class="about-quote">
          <p>
            „Ein Ort abseits der Welt — geschaffen für Gäste, die mitten in der Stadt
            ankommen und trotzdem Ruhe finden möchten.“
          </p>
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
.about-page {
  min-height: 100vh;
  background: #0d0d0d;
  color: #f5f0e8;
}

.about-hero {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  min-height: 620px;
}

.about-copy {
  padding: 96px 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.eyebrow {
  display: inline-block;
  color: #c9a96e;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  margin-bottom: 24px;
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
  font-size: clamp(42px, 5vw, 72px);
  max-width: 760px;
  margin-bottom: 32px;
}

h2 {
  font-size: clamp(34px, 4vw, 56px);
}

h3 {
  color: #f5f0e8;
  font-size: 18px;
  margin: 0 0 14px;
}

p {
  color: #c8bca9;
  line-height: 1.8;
  font-size: 15px;
  max-width: 620px;
}

.about-image {
  min-height: 620px;
  background:
    linear-gradient(rgba(13, 13, 13, 0.05), rgba(13, 13, 13, 0.2)),
    url('https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80');
  background-size: cover;
  background-position: center;
}

.about-section {
  padding: 88px 64px;
  border-top: 1px solid rgba(201, 169, 110, 0.45);
}

.section-heading {
  margin-bottom: 48px;
}

.text-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
}

.text-grid article {
  border-top: 1px solid rgba(201, 169, 110, 0.35);
  padding-top: 24px;
}

.about-quote {
  padding: 72px 64px 96px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.about-quote p {
  font-family: Georgia, 'Times New Roman', serif;
  font-style: italic;
  font-size: clamp(28px, 3vw, 46px);
  line-height: 1.35;
  color: #f5f0e8;
  max-width: 1000px;
}

@media (max-width: 900px) {
  .about-hero {
    grid-template-columns: 1fr;
  }

  .about-copy {
    padding: 72px 28px;
  }

  .about-image {
    min-height: 360px;
  }

  .about-section,
  .about-quote {
    padding: 64px 28px;
  }

  .text-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>