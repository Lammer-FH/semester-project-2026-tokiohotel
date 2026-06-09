<template>
  <ion-page>
    <ion-content :fullscreen="false">
      <AppHeader :dark="true" />

      <div class="booking-topbar">
        <button type="button" class="dismiss-btn" @click="dismiss">
          ✕ Buchung abbrechen
        </button>
      </div>

      <div class="booking-page">
        <div v-if="roomStore.loading && !room" class="state-message">
          Zimmer wird geladen…
        </div>

        <div v-else-if="roomStore.error && !room" class="state-message state-message--error">
          <h2>Zimmer konnte nicht geladen werden</h2>
          <p>
            Bitte prüfen Sie Ihre Verbindung oder versuchen Sie es später erneut.
          </p>
          <button type="button" class="retry-btn" @click="loadRoom">
            Erneut versuchen
          </button>
        </div>

        <div v-else-if="!room" class="state-message">
          Zimmer nicht gefunden.
        </div>

        <!-- Step 3: Confirmation -->
        <section v-else-if="step === 'confirmed' && bookingStore.confirmation" class="confirmation-panel">
          <h1 class="section-heading">Buchung #{{ bookingStore.confirmation.id }} bestätigt</h1>

          <dl class="confirmation-details">
            <div class="conf-row">
              <dt>Zimmer</dt>
              <dd>{{ bookingStore.confirmation.room?.roomType?.title }} (Nr. {{ bookingStore.confirmation.room?.roomNumber }})</dd>
            </div>

            <div class="conf-row">
              <dt>Zeitraum</dt>
              <dd>{{ bookingStore.confirmation.startDate }} → {{ bookingStore.confirmation.endDate }}</dd>
            </div>

            <div class="conf-row">
              <dt>Gast</dt>
              <dd>
                {{ bookingStore.confirmation.guest?.firstName }}
                {{ bookingStore.confirmation.guest?.lastName }}
                ({{ bookingStore.confirmation.guest?.email }})
              </dd>
            </div>

            <div class="conf-row">
              <dt>Frühstück</dt>
              <dd>{{ bookingStore.confirmation.withBreakfast ? 'Ja' : 'Nein' }}</dd>
            </div>

            <div class="conf-row total">
              <dt>Gesamt</dt>
              <dd>€{{ Number(bookingStore.confirmation.totalCost).toFixed(2) }}</dd>
            </div>
          </dl>

          <ion-button expand="block" class="primary-btn" @click="router.push('/')">
            Zurück zur Startseite
          </ion-button>
        </section>

        <!-- Step 2: Review -->
        <section v-else-if="step === 'review'" class="booking-form">
          <header class="form-header">
            <h1 class="section-heading">Buchung überprüfen</h1>
            <p class="room-summary">
              Bitte überprüfen Sie Ihre Angaben vor der Buchung.
            </p>
          </header>

          <dl class="review-grid">
            <div class="conf-row">
              <dt>Zimmer</dt>
              <dd>{{ room.roomType?.title }} (Nr. {{ room.roomNumber }})</dd>
            </div>

            <div class="conf-row">
              <dt>Zeitraum</dt>
              <dd>{{ formattedCheckIn }} → {{ formattedCheckOut }} ({{ nights }} {{ nights === 1 ? 'Nacht' : 'Nächte' }})</dd>
            </div>

            <div class="conf-row">
              <dt>Vorname</dt>
              <dd>{{ firstName }}</dd>
            </div>

            <div class="conf-row">
              <dt>Nachname</dt>
              <dd>{{ lastName }}</dd>
            </div>

            <div class="conf-row">
              <dt>E-Mail</dt>
              <dd>{{ email }}</dd>
            </div>

            <div class="conf-row">
              <dt>Frühstück</dt>
              <dd>{{ withBreakfast ? 'Ja (+€15 / Nacht)' : 'Nein' }}</dd>
            </div>

            <div class="conf-row total">
              <dt>Gesamt</dt>
              <dd>€{{ total.toFixed(2) }}</dd>
            </div>
          </dl>

          <p v-if="bookingStore.error" class="form-error">
            {{ bookingStore.error }}
          </p>

          <div class="button-row">
            <ion-button expand="block" fill="outline" class="secondary-btn" @click="step = 'form'">
              Zurück
            </ion-button>
            <ion-button
              expand="block"
              class="primary-btn"
              :disabled="bookingStore.loading"
              @click="submit"
            >
              {{ bookingStore.loading ? 'Wird gebucht…' : 'Jetzt buchen' }}
            </ion-button>
          </div>
        </section>

        <!-- Step 1: Form -->
        <section v-else class="booking-form">
          <header class="form-header">
            <h1 class="section-heading">Buchen</h1>
            <p class="room-summary">
              {{ room.roomType?.title }} · Zimmer {{ room.roomNumber }} ·
              €{{ room.roomType?.cost?.toFixed(2) }} / Nacht
            </p>
          </header>

          <div class="form-grid">
            <!-- Dates -->
            <div class="form-row">
              <span class="field-label">Zeitraum</span>
              <div class="date-trigger" @click="isPickerOpen = true">
                <span class="date-value">{{ formattedCheckIn }} → {{ formattedCheckOut }}</span>
                <span class="date-nights">
                  {{ nights }} {{ nights === 1 ? 'Nacht' : 'Nächte' }}
                </span>
              </div>
            </div>

            <!-- Guest fields -->
            <div class="form-row">
              <span class="field-label">Vorname</span>
              <ion-input
                v-model="firstName"
                placeholder="Vorname"
                class="text-input"
                required
              />
            </div>

            <div class="form-row">
              <span class="field-label">Nachname</span>
              <ion-input
                v-model="lastName"
                placeholder="Nachname"
                class="text-input"
                required
              />
            </div>

            <div class="form-row">
              <span class="field-label">E-Mail</span>
              <ion-input
                v-model="email"
                type="email"
                placeholder="email@beispiel.de"
                class="text-input"
                required
              />
            </div>

            <div class="form-row">
              <span class="field-label">E-Mail bestätigen</span>
              <ion-input
                v-model="confirmEmail"
                type="email"
                placeholder="E-Mail erneut eingeben"
                class="text-input"
                :class="{ 'input-error': confirmEmail && !emailsMatch }"
                required
              />
              <span v-if="confirmEmail && !emailsMatch" class="field-error">
                E-Mail-Adressen stimmen nicht überein.
              </span>
            </div>

            <!-- Breakfast toggle -->
            <div class="form-row toggle-row">
              <span class="field-label">Frühstück (+€15 / Nacht)</span>
              <ion-toggle v-model="withBreakfast" />
            </div>

            <!-- Total -->
            <div class="form-row total-row">
              <span class="field-label">Gesamt</span>
              <span class="total-value">€{{ total.toFixed(2) }}</span>
            </div>
          </div>

          <ion-button
            expand="block"
            class="primary-btn"
            :disabled="!canProceed"
            @click="step = 'review'"
          >
            Weiter zur Übersicht
          </ion-button>
        </section>

        <!-- Date picker modal -->
        <ion-modal
          :is-open="isPickerOpen"
          :keep-contents-mounted="true"
          class="picker-modal"
          @did-dismiss="isPickerOpen = false"
        >
          <DateRangePicker @close="isPickerOpen = false" />
        </ion-modal>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  IonPage,
  IonContent,
  IonButton,
  IonInput,
  IonToggle,
  IonModal,
} from '@ionic/vue';
import AppHeader from '@/components/organism/AppHeader.vue';
import DateRangePicker from '@/components/molecules/DateRangePicker.vue';
import { useRoomStore } from '@/stores/roomStore';
import { useBookingStore } from '@/stores/bookingStore';

type BookingStep = 'form' | 'review' | 'confirmed';

const route = useRoute();
const router = useRouter();
const roomStore = useRoomStore();
const bookingStore = useBookingStore();

const room = computed(() => roomStore.selectedRoom);

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const confirmEmail = ref('');
const withBreakfast = ref(false);

const step = ref<BookingStep>('form');
const isPickerOpen = ref(false);

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';

  const [y, m, d] = dateStr.split('-').map(Number);

  return new Date(y, m - 1, d).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const formattedCheckIn = computed(() => formatDate(roomStore.checkIn));
const formattedCheckOut = computed(() => formatDate(roomStore.checkOut));

const nights = computed(() => {
  if (!roomStore.checkIn || !roomStore.checkOut) return 0;

  const a = new Date(roomStore.checkIn).getTime();
  const b = new Date(roomStore.checkOut).getTime();
  const diff = Math.round((b - a) / 86400000);

  return diff > 0 ? diff : 0;
});

const total = computed(() => {
  const perNight = room.value?.roomType?.cost ?? 0;
  return (perNight + (withBreakfast.value ? 15 : 0)) * nights.value;
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emailsMatch = computed(
  () => email.value.trim().toLowerCase() === confirmEmail.value.trim().toLowerCase(),
);

const canProceed = computed(
  () =>
    !!room.value?.id &&
    nights.value > 0 &&
    firstName.value.trim() !== '' &&
    lastName.value.trim() !== '' &&
    emailRegex.test(email.value.trim()) &&
    emailsMatch.value,
);

function resetState() {
  bookingStore.resetBooking();
  step.value = 'form';
  firstName.value = '';
  lastName.value = '';
  email.value = '';
  confirmEmail.value = '';
  withBreakfast.value = false;
}

function dismiss() {
  const id = route.params.id;
  bookingStore.resetBooking();
  router.push(`/rooms/${id}`);
}

function loadRoom() {
  const id = Number(route.params.id);

  if (!Number.isNaN(id)) {
    roomStore.fetchRoomById(id);
  }
}

async function submit() {
  if (!canProceed.value || !room.value?.id) return;

  try {
    await bookingStore.createBooking({
      roomId: room.value.id,
      startDate: roomStore.checkIn,
      endDate: roomStore.checkOut,
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value.trim(),
      withBreakfast: withBreakfast.value,
    });

    step.value = 'confirmed';
  } catch {
    // error is already set in the store
  }
}

onMounted(loadRoom);

watch(
  () => route.params.id,
  () => {
    resetState();
    loadRoom();
  },
);
</script>

<style scoped>
ion-content {
  --ion-background-color: #111111;
}

.booking-topbar {
  display: flex;
  justify-content: flex-end;
  padding: 12px 24px 0;
  max-width: 720px;
  margin: 0 auto;
}

.dismiss-btn {
  background: transparent;
  border: none;
  color: #8a8278;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.04em;
  cursor: pointer;
  padding: 8px 0;
  transition: color 0.15s;
}

.dismiss-btn:hover {
  color: #d97766;
}

.booking-page {
  min-height: 100vh;
  padding: 16px 24px 64px;
  max-width: 720px;
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

.section-heading {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 36px;
  font-weight: 400;
  font-style: italic;
  color: #f5f0e8;
  margin: 0 0 8px;
  line-height: 1.2;
}

.form-header {
  margin-bottom: 32px;
}

.room-summary {
  color: #a0998a;
  font-size: 14px;
  margin: 0;
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #1a1a1a;
  padding: 24px;
  margin-bottom: 24px;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #8a8278;
  font-weight: 700;
}

.date-trigger {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.date-trigger:hover .date-value {
  color: #c9a96e;
}

.date-value {
  color: #f5f0e8;
  font-size: 15px;
  font-weight: 500;
}

.date-nights {
  color: #8a8278;
  font-size: 12px;
}

.text-input {
  --background: transparent;
  --color: #f5f0e8;
  --placeholder-color: #5a5248;
  --padding-start: 0;
  --padding-end: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 15px;
}

.input-error {
  border-bottom-color: #d97766;
}

.field-error {
  color: #d97766;
  font-size: 12px;
}

.toggle-row {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
}

.total-row {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding-top: 16px;
  margin-top: 8px;
}

.total-value {
  color: #c9a96e;
  font-size: 22px;
  font-weight: 600;
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

.button-row {
  display: flex;
  gap: 12px;
}

.button-row ion-button {
  flex: 1;
}

.form-error {
  color: #d97766;
  font-size: 14px;
  margin: 0 0 16px;
  padding: 12px 16px;
  background: rgba(217, 119, 102, 0.1);
  border-left: 3px solid #d97766;
}

/* Review grid */
.review-grid {
  margin: 0 0 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #1a1a1a;
  padding: 24px;
}

/* Confirmation panel */
.confirmation-panel {
  background: #1a1a1a;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.confirmation-details {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.conf-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.conf-row dt {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #8a8278;
  font-weight: 700;
}

.conf-row dd {
  margin: 0;
  color: #f5f0e8;
  font-size: 15px;
  text-align: right;
}

.conf-row.total dt,
.conf-row.total dd {
  font-size: 18px;
  color: #c9a96e;
}

.picker-modal {
  --width: min(400px, 100%);
  --height: min(560px, 92vh);
  --border-radius: 20px;
  --box-shadow: 0 24px 64px rgba(0, 0, 0, 0.65);
}

@media (max-width: 640px) {
  .picker-modal {
    --width: 100%;
    --height: 88vh;
    --border-radius: 20px 20px 0 0;
  }
}
</style>
