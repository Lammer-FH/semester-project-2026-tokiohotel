<template>
  <ion-page>
    <ion-content :fullscreen="false" class="dark-page">
      <AppHeader :dark="true" />

      <div class="confirmation-page">
        <StateMessage
          v-if="bookingStore.loading"
          message="Buchung wird geladen…"
        />

        <StateMessage
          v-else-if="bookingStore.error"
          variant="error"
          title="Buchung konnte nicht geladen werden"
          message="Bitte prüfen Sie Ihre Verbindung oder versuchen Sie es später erneut."
          retry-label="Erneut versuchen"
          @retry="loadBooking"
        />

        <StateMessage
          v-else-if="!booking"
          message="Buchung nicht gefunden."
        />

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
                <ExtraChipList :extras="extras" />
              </div>
            </div>
          </section>

          <!-- Booking details -->
          <section class="conf-section">
            <h2 class="conf-section-heading">Buchungsdetails</h2>
            <DetailsGrid :rows="bookingRows" />
          </section>

          <!-- Guest data -->
          <section class="conf-section">
            <h2 class="conf-section-heading">Ihre Daten</h2>
            <DetailsGrid :rows="guestRows" />
          </section>

          <!-- Directions -->
          <DirectionsSection />

          <!-- Contact -->
          <section class="conf-section">
            <h2 class="conf-section-heading">Kontakt</h2>
            <DetailsGrid :rows="contactRows" />
          </section>

          <!-- Feedback -->
          <div class="no-print">
            <FeedbackSection :booking-id="booking.id" />
          </div>

          <!-- Actions -->
          <div class="conf-actions no-print">
            <ion-button expand="block" class="btn-primary" @click="printPage">
              Bestätigung drucken
            </ion-button>
            <ion-button expand="block" fill="outline" class="btn-secondary" @click="router.push('/')">
              Zurück zur Startseite
            </ion-button>
          </div>
        </article>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import AppHeader from '@/components/organism/AppHeader.vue';
import StateMessage from '@/components/atoms/StateMessage.vue';
import ExtraChipList from '@/components/atoms/ExtraChipList.vue';
import DetailsGrid from '@/components/molecules/DetailsGrid.vue';
import type { DetailRow } from '@/components/molecules/DetailsGrid.vue';
import DirectionsSection from '@/components/molecules/DirectionsSection.vue';
import FeedbackSection from '@/components/molecules/FeedbackSection.vue';
import { useBookingStore } from '@/stores/bookingStore';
import { resolveRoomImage } from '@/utils/roomImages';

const route = useRoute();
const router = useRouter();
const bookingStore = useBookingStore();

const booking = computed(() => bookingStore.confirmation);
const extras = computed(() => booking.value?.room?.roomType?.extras ?? []);

const imageUrl = computed(() =>
  resolveRoomImage(
    booking.value?.room?.roomType?.images as string[] | string | undefined,
    booking.value?.room?.roomType?.title,
  ),
);

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

const bookingRows = computed<DetailRow[]>(() => [
  { label: 'Check-in', value: formatDate(booking.value?.startDate) },
  { label: 'Check-out', value: formatDate(booking.value?.endDate) },
  { label: 'Aufenthalt', value: `${nights.value} ${nights.value === 1 ? 'Nacht' : 'Nächte'}` },
  { label: 'Frühstück', value: booking.value?.withBreakfast ? 'Ja (+€15 / Nacht)' : 'Nein' },
  { label: 'Gesamtpreis', value: `€${Number(booking.value?.totalCost).toFixed(2)}`, highlight: true },
]);

const guestRows = computed<DetailRow[]>(() => [
  { label: 'Name', value: `${booking.value?.guest?.firstName} ${booking.value?.guest?.lastName}` },
  { label: 'E-Mail', value: booking.value?.guest?.email ?? '—' },
]);

const contactRows: DetailRow[] = [
  { label: 'Telefon', value: '+43 1 234 5678' },
  { label: 'E-Mail', value: 'rezeption@tokio-hotel.at' },
  { label: 'Check-in Zeiten', value: '15:00 – 22:00 Uhr' },
  { label: 'Check-out', value: 'bis 11:00 Uhr' },
];

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
.confirmation-page {
  min-height: 100vh;
  padding: 32px 24px 64px;
  max-width: 860px;
  margin: 0 auto;
}

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

/* Actions */
.conf-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
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

/* Print styles */
@media print {
  .dark-page {
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

  .room-detail-card {
    background: #ffffff;
    border: 1px solid #eeeeee;
  }

  .room-title {
    color: #111111;
  }

  .room-number,
  .room-description {
    color: #555555;
  }

  .room-image-wrap {
    width: 200px;
  }
}
</style>
