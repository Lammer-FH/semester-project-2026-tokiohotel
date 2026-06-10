<template>
  <ion-page>
    <ion-content :fullscreen="false">
      <AppHeader :dark="true" />

      <div class="confirmation-page">
        <div v-if="bookingStore.loading" class="state-message">
          Buchung wird geladen…
        </div>

        <div v-else-if="bookingStore.error" class="state-message state-message--error">
          <h2>Buchung konnte nicht geladen werden</h2>
          <p>Bitte prüfen Sie Ihre Verbindung oder versuchen Sie es später erneut.</p>
          <button type="button" class="retry-btn" @click="loadBooking">
            Erneut versuchen
          </button>
        </div>

        <div v-else-if="!booking" class="state-message">
          Buchung nicht gefunden.
        </div>

        <article v-else class="confirmation">
          <!-- Success banner -->
          <header class="conf-header">
            <span class="conf-badge">Bestätigt</span>
            <h1 class="conf-title">Buchung #{{ booking.id }}</h1>
            <p class="conf-subtitle">
              Vielen Dank für Ihre Reservierung. Nachfolgend finden Sie alle Details.
            </p>
          </header>

          <!-- Room details -->
          <section class="conf-section">
            <h2 class="conf-section-heading">Ihr Zimmer</h2>

            <div class="room-detail-card">
              <div class="room-image-wrap">
                <img :src="imageUrl" :alt="booking.room?.roomType?.title" class="room-image" />
              </div>

              <div class="room-info">
                <h3 class="room-title">{{ booking.room?.roomType?.title }}</h3>
                <span class="room-number">Zimmer {{ booking.room?.roomNumber }}</span>
                <p class="room-description">{{ booking.room?.roomType?.description }}</p>

                <div v-if="extras.length" class="room-extras">
                  <span v-for="extra in extras" :key="extra.id" class="extra-chip">
                    <ion-icon :name="extra.icon" class="extra-icon" />
                    {{ extra.name }}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <!-- Booking details -->
          <section class="conf-section">
            <h2 class="conf-section-heading">Buchungsdetails</h2>

            <dl class="details-grid">
              <div class="detail-row">
                <dt>Check-in</dt>
                <dd>{{ formatDate(booking.startDate) }}</dd>
              </div>

              <div class="detail-row">
                <dt>Check-out</dt>
                <dd>{{ formatDate(booking.endDate) }}</dd>
              </div>

              <div class="detail-row">
                <dt>Aufenthalt</dt>
                <dd>{{ nights }} {{ nights === 1 ? 'Nacht' : 'Nächte' }}</dd>
              </div>

              <div class="detail-row">
                <dt>Frühstück</dt>
                <dd>{{ booking.withBreakfast ? 'Ja (+€15 / Nacht)' : 'Nein' }}</dd>
              </div>

              <div class="detail-row detail-row--total">
                <dt>Gesamtpreis</dt>
                <dd>€{{ Number(booking.totalCost).toFixed(2) }}</dd>
              </div>
            </dl>
          </section>

          <!-- Guest data -->
          <section class="conf-section">
            <h2 class="conf-section-heading">Ihre Daten</h2>

            <dl class="details-grid">
              <div class="detail-row">
                <dt>Name</dt>
                <dd>{{ booking.guest?.firstName }} {{ booking.guest?.lastName }}</dd>
              </div>

              <div class="detail-row">
                <dt>E-Mail</dt>
                <dd>{{ booking.guest?.email }}</dd>
              </div>
            </dl>
          </section>

          <!-- Directions -->
          <section class="conf-section">
            <h2 class="conf-section-heading">Anreise</h2>

            <div class="directions-content">
              <div class="map-wrap">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2659.6404785498014!2d16.366612!3d48.203544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d07984a896be3%3A0x2a0e213c859e6fb5!2sOpernring%202%2C%201010%20Wien%2C%20Austria!5e0!3m2!1sde!2sat!4v1718000000000"
                  class="map-iframe"
                  allowfullscreen
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  title="Standort Tokio Hotel"
                />
              </div>

              <div class="directions-info">
                <h3 class="directions-heading">So finden Sie uns</h3>
                <address class="hotel-address">
                  Tokio Hotel<br />
                  Opern Ring 2<br />
                  1010 Wien, Österreich
                </address>

                <div class="travel-options">
                  <div class="travel-option">
                    <strong>Mit der UBahn</strong>
                    <p>Wien Hauptbahnhof → U1 Richtung Leopoldau → Station Karlsplatz (ca. 10 Min.), dann 3 Minuten zu Fuß.</p>
                    <p>Kaufen Sie Tickets hier: <a href="https://shop.wienmobil.at/en/products" target="_blank" rel="noopener" class="travel-link">shop.wienmobil.at</a></p>
                  </div>
                  <div class="travel-option">
                    <strong>Mit dem Auto</strong>
                    <p>Über die A1/A2 Richtung Zentrum. Tiefgarage vorhanden (€18/Tag).</p>
                  </div>
                  <div class="travel-option">
                    <strong>Vom Flughafen</strong>
                    <p>Wien-Schwechat → City Airport Train (CAT) zum Bahnhof Wien Mitte (16 Min.), dann U3 bis Stephansplatz.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Contact -->
          <section class="conf-section">
            <h2 class="conf-section-heading">Kontakt</h2>

            <dl class="details-grid">
              <div class="detail-row">
                <dt>Telefon</dt>
                <dd>+43 1 234 5678</dd>
              </div>

              <div class="detail-row">
                <dt>E-Mail</dt>
                <dd>rezeption@tokio-hotel.at</dd>
              </div>

              <div class="detail-row">
                <dt>Check-in Zeiten</dt>
                <dd>15:00 – 22:00 Uhr</dd>
              </div>

              <div class="detail-row">
                <dt>Check-out</dt>
                <dd>bis 11:00 Uhr</dd>
              </div>
            </dl>
          </section>

          <!-- Feedback -->
          <section class="conf-section no-print">
            <h2 class="conf-section-heading">Lass uns Feedback da</h2>

            <div class="feedback-card">
              <div class="star-rating">
                <button
                  v-for="star in 5"
                  :key="star"
                  type="button"
                  class="star-btn"
                  :class="{ active: star <= (hoverRating || feedbackRating) }"
                  @mouseenter="hoverRating = star"
                  @mouseleave="hoverRating = 0"
                  @click="feedbackRating = star"
                >
                  ★
                </button>
              </div>

              <ion-textarea
                v-model="feedbackText"
                placeholder="Optionaler Kommentar…"
                class="feedback-textarea"
                :rows="3"
                :auto-grow="true"
              />

              <ion-button
                expand="block"
                class="primary-btn"
                :disabled="feedbackRating === 0 || feedbackSent"
                @click="sendFeedback"
              >
                {{ feedbackSent ? 'Danke für Ihr Feedback!' : 'Feedback senden' }}
              </ion-button>
            </div>
          </section>

          <!-- Actions -->
          <div class="conf-actions no-print">
            <ion-button expand="block" class="primary-btn" @click="printPage">
              Bestätigung drucken
            </ion-button>
            <ion-button expand="block" fill="outline" class="secondary-btn" @click="router.push('/')">
              Zurück zur Startseite
            </ion-button>
          </div>
        </article>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IonPage, IonContent, IonButton, IonIcon, IonTextarea } from '@ionic/vue';
import AppHeader from '@/components/organism/AppHeader.vue';
import { useBookingStore } from '@/stores/bookingStore';

const route = useRoute();
const router = useRouter();
const bookingStore = useBookingStore();

const booking = computed(() => bookingStore.confirmation);

const feedbackRating = ref(0);
const hoverRating = ref(0);
const feedbackText = ref('');
const feedbackSent = ref(false);

function sendFeedback() {
  if (feedbackRating.value === 0) return;
  // TODO: send to backend once endpoint exists
  console.log('Feedback:', { rating: feedbackRating.value, text: feedbackText.value, bookingId: booking.value?.id });
  feedbackSent.value = true;
}

const extras = computed(() => booking.value?.room?.roomType?.extras ?? []);

const imageUrl = computed(() => {
  const images = booking.value?.room?.roomType?.images;

  if (Array.isArray(images) && images.length > 0) {
    return images[0];
  }

  if (typeof images === 'string') {
    const first = images.split(',')[0]?.trim();
    if (first) {
      return first.startsWith('/') ? first : `/${first}`;
    }
  }

  return `https://placehold.co/800x400?text=${encodeURIComponent(
    booking.value?.room?.roomType?.title ?? 'Room',
  )}`;
});

const nights = computed(() => {
  if (!booking.value?.startDate || !booking.value?.endDate) return 0;
  const a = new Date(booking.value.startDate).getTime();
  const b = new Date(booking.value.endDate).getTime();
  const diff = Math.round((b - a) / 86400000);
  return diff > 0 ? diff : 0;
});

function formatDate(dateStr?: string): string {
  if (!dateStr) return '—';
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function loadBooking() {
  const id = Number(route.params.id);
  if (!Number.isNaN(id) && (!booking.value || booking.value.id !== id)) {
    bookingStore.fetchBookingById(id);
  }
}

function printPage() {
  window.print();
}

onMounted(loadBooking);
watch(() => route.params.id, loadBooking);
</script>

<style scoped>
ion-content {
  --ion-background-color: #111111;
}

.confirmation-page {
  min-height: 100vh;
  padding: 32px 24px 64px;
  max-width: 860px;
  margin: 0 auto;
}

.state-message {
  padding: 64px 24px;
  text-align: center;
  color: #a0998a;
  font-size: 15px;
}

.state-message h2 {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 28px;
  font-weight: 400;
  font-style: italic;
  color: #f5f0e8;
  margin: 0 0 12px;
}

.state-message p {
  color: #a0998a;
  margin: 0 0 20px;
}

.state-message--error {
  max-width: 520px;
  margin: 0 auto;
}

.retry-btn {
  background: transparent;
  color: #c9a96e;
  border: 1px solid #c9a96e;
  padding: 10px 22px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.retry-btn:hover {
  background: #c9a96e;
  color: #111111;
}

/* Confirmation layout */
.confirmation {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* Header */
.conf-header {
  text-align: center;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(201, 169, 110, 0.2);
}

.conf-badge {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #d8f3dc;
  background: rgba(64, 145, 108, 0.18);
  border: 1px solid rgba(64, 145, 108, 0.45);
  margin-bottom: 16px;
}

.conf-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 36px;
  font-weight: 400;
  font-style: italic;
  color: #f5f0e8;
  margin: 0 0 8px;
  line-height: 1.2;
}

.conf-subtitle {
  color: #a0998a;
  font-size: 15px;
  margin: 0;
}

/* Sections */
.conf-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.conf-section-heading {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #c9a96e;
  font-weight: 700;
  margin: 0;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

/* Room detail card */
.room-detail-card {
  display: flex;
  gap: 24px;
  background: #1a1a1a;
  overflow: hidden;
}

.room-image-wrap {
  width: 280px;
  flex-shrink: 0;
  overflow: hidden;
}

.room-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.room-info {
  padding: 20px 20px 20px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.room-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 22px;
  font-weight: 400;
  font-style: italic;
  color: #f5f0e8;
  margin: 0;
}

.room-number {
  font-size: 12px;
  color: #8a8278;
  letter-spacing: 0.04em;
}

.room-description {
  font-size: 14px;
  color: #a0998a;
  line-height: 1.6;
  margin: 4px 0 0;
}

.room-extras {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}

.extra-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #a0998a;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 3px 8px;
  border-radius: 4px;
}

.extra-icon {
  font-size: 13px;
  color: #c9a96e;
}

/* Details grid */
.details-grid {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  background: #1a1a1a;
  padding: 20px 24px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.detail-row:last-child,
.detail-row--total {
  border-bottom: none;
}

.detail-row dt {
  font-size: 13px;
  color: #8a8278;
  font-weight: 500;
}

.detail-row dd {
  margin: 0;
  color: #f5f0e8;
  font-size: 15px;
  text-align: right;
}

.detail-row + .detail-row--total {
  border-top: 1px solid rgba(201, 169, 110, 0.25);
  margin-top: -1px;
  padding-top: 14px;
}

.detail-row--total dt,
.detail-row--total dd {
  font-size: 18px;
  font-weight: 600;
  color: #c9a96e;
}

/* Directions */
.directions-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.map-wrap {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #1a1a1a;
}

.map-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.directions-info {
  background: #1a1a1a;
  padding: 24px;
}

.directions-heading {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 18px;
  font-weight: 400;
  font-style: italic;
  color: #f5f0e8;
  margin: 0 0 12px;
}

.hotel-address {
  font-style: normal;
  color: #a0998a;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.travel-options {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.travel-option strong {
  font-size: 13px;
  color: #f5f0e8;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.travel-option p {
  font-size: 14px;
  color: #a0998a;
  line-height: 1.5;
  margin: 4px 0 0;
}

.travel-link {
  color: #c9a96e;
  text-decoration: none;
}

.travel-link:hover {
  text-decoration: underline;
}

/* Feedback */
.feedback-card {
  background: #1a1a1a;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.star-rating {
  display: flex;
  gap: 8px;
}

.star-btn {
  background: transparent;
  border: none;
  font-size: 28px;
  color: #3a3a3a;
  cursor: pointer;
  padding: 0;
  transition: color 0.15s, transform 0.1s;
}

.star-btn:hover,
.star-btn.active {
  color: #c9a96e;
}

.star-btn:hover {
  transform: scale(1.15);
}

.feedback-textarea {
  --background: transparent;
  --color: #f5f0e8;
  --placeholder-color: #5a5248;
  --padding-start: 0;
  --padding-end: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 15px;
}

/* Actions */
.conf-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
}

.primary-btn {
  --background: #c9a96e;
  --background-hover: #b89858;
  --background-activated: #b89858;
  --color: #111111;
  --border-radius: 0;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 14px;
}

.secondary-btn {
  --color: #c9a96e;
  --border-color: #c9a96e;
  --border-radius: 0;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 14px;
}

/* Mobile */
@media (max-width: 640px) {
  .room-detail-card {
    flex-direction: column;
  }

  .room-image-wrap {
    width: 100%;
    height: 200px;
  }

  .room-info {
    padding: 16px;
  }
}

@media (min-width: 768px) {
  .directions-content {
    flex-direction: row;
  }

  .map-wrap {
    flex: 1;
    aspect-ratio: auto;
    min-height: 300px;
  }

  .directions-info {
    flex: 1;
  }
}

/* Print styles */
@media print {
  ion-content {
    --ion-background-color: #ffffff;
  }

  .confirmation-page {
    padding: 0;
    max-width: 100%;
    color: #111111;
  }

  .no-print {
    display: none !important;
  }

  .confirmation {
    gap: 20px;
  }

  .conf-header {
    border-bottom-color: #cccccc;
  }

  .conf-badge {
    color: #2d6a4f;
    background: #e8f5e9;
    border-color: #a5d6a7;
  }

  .conf-title {
    color: #111111;
    font-size: 28px;
  }

  .conf-subtitle {
    color: #555555;
  }

  .conf-section-heading {
    color: #8a7a5a;
    border-bottom-color: #dddddd;
  }

  .room-detail-card,
  .details-grid,
  .directions-info {
    background: #ffffff;
    border: 1px solid #eeeeee;
  }

  .room-title,
  .directions-heading {
    color: #111111;
  }

  .room-number,
  .room-description,
  .hotel-address,
  .travel-option p {
    color: #555555;
  }

  .extra-chip {
    color: #555555;
    background: #f5f5f5;
    border-color: #dddddd;
  }

  .extra-icon {
    color: #8a7a5a;
  }

  .detail-row dt {
    color: #777777;
  }

  .detail-row dd {
    color: #111111;
  }

  .detail-row--total dt,
  .detail-row--total dd {
    color: #8a7a5a;
    border-top-color: #cccccc;
  }

  .detail-row {
    border-bottom-color: #eeeeee;
  }

  .travel-option strong {
    color: #111111;
  }

  .travel-link {
    color: #8a7a5a;
  }

  .map-wrap {
    height: 250px;
  }

  .room-image-wrap {
    width: 200px;
  }
}
</style>
