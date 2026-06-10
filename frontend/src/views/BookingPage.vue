<template>
  <ion-page>
    <ion-content :fullscreen="false" class="dark-page">
      <AppHeader :dark="true" />

      <div class="booking-topbar">
        <button type="button" class="dismiss-btn" @click="dismiss">
          ✕ Buchung abbrechen
        </button>
      </div>

      <div class="booking-page">
        <StateMessage
          v-if="roomStore.loading && !room"
          message="Zimmer wird geladen…"
        />

        <StateMessage
          v-else-if="roomStore.error && !room"
          variant="error"
          title="Zimmer konnte nicht geladen werden"
          message="Bitte prüfen Sie Ihre Verbindung oder versuchen Sie es später erneut."
          retry-label="Erneut versuchen"
          @retry="loadRoom"
        />

        <StateMessage
          v-else-if="!room"
          message="Zimmer nicht gefunden."
        />

        <!-- Step 2: Review -->
        <section v-else-if="step === 'review'" class="booking-form">
          <header class="form-header">
            <h1 class="section-heading heading-serif">Buchung überprüfen</h1>
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
              <dd>
                {{ formattedCheckIn }} → {{ formattedCheckOut }} ({{ nights }}
                {{ nights === 1 ? 'Nacht' : 'Nächte' }})
              </dd>
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
              <dd>
                {{ withBreakfast ? 'Ja (+€15 / Nacht)' : 'Nein' }}
              </dd>
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
            <ion-button
              expand="block"
              fill="outline"
              class="btn-secondary"
              @click="step = 'form'"
            >
              Zurück
            </ion-button>
            <ion-button
              expand="block"
              class="btn-primary"
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
            <h1 class="section-heading heading-serif">Buchen</h1>
            <h2 class="room-summary">
              {{ room.roomType?.title }} · Zimmer {{ room.roomNumber }} · €{{
                room.roomType?.cost?.toFixed(2)
              }}
              / Nacht
            </h2>
          </header>

          <div class="form-grid">
            <!-- Dates -->
            <div class="form-row">
              <span class="field-label">Zeitraum</span>
              <div class="date-trigger" @click="isPickerOpen = true">
                <span class="date-value"
                  >{{ formattedCheckIn }} → {{ formattedCheckOut }}</span
                >
                <span class="date-nights">
                  {{ nights }}
                  {{ nights === 1 ? 'Nacht' : 'Nächte' }}
                </span>
              </div>

              <!-- Availability for the selected timeframe -->
              <span
                v-if="nights > 0 && roomStore.availability !== 'unknown'"
                class="availability"
                :class="`availability--${roomStore.availability}`"
              >
                <template v-if="roomStore.availability === 'loading'">
                  Verfügbarkeit wird geprüft…
                </template>
                <template v-else-if="roomStore.availability === 'available'">
                  ✓ In diesem Zeitraum verfügbar
                </template>
                <template v-else>
                  ✕ In diesem Zeitraum nicht verfügbar
                </template>
              </span>
            </div>

            <!-- Guest fields -->
            <div class="form-row">
              <span class="field-label">Vorname</span>
              <ion-input
                v-model="firstName"
                placeholder="Vorname"
                class="text-input"
                :class="{
                  'input-error': firstNameTouched && !firstNameValid,
                }"
                required
                @ion-blur="firstNameTouched = true"
              />
              <span
                v-if="firstNameTouched && !firstNameValid"
                class="field-error"
              >
                Bitte geben Sie Ihren Vornamen ein.
              </span>
            </div>

            <div class="form-row">
              <span class="field-label">Nachname</span>
              <ion-input
                v-model="lastName"
                placeholder="Nachname"
                class="text-input"
                :class="{
                  'input-error': lastNameTouched && !lastNameValid,
                }"
                required
                @ion-blur="lastNameTouched = true"
              />
              <span
                v-if="lastNameTouched && !lastNameValid"
                class="field-error"
              >
                Bitte geben Sie Ihren Nachnamen ein.
              </span>
            </div>

            <div class="form-row">
              <span class="field-label">E-Mail</span>
              <ion-input
                v-model="email"
                type="email"
                placeholder="email@beispiel.de"
                class="text-input"
                :class="{
                  'input-error': emailTouched && !emailValid,
                }"
                required
                @ion-blur="emailTouched = true"
              />
              <span v-if="emailTouched && !emailValid" class="field-error">
                Bitte geben Sie eine gültige E-Mail-Adresse ein.
              </span>
            </div>

            <div class="form-row">
              <span class="field-label">E-Mail bestätigen</span>
              <ion-input
                v-model="confirmEmail"
                type="email"
                placeholder="E-Mail erneut eingeben"
                class="text-input"
                :class="{
                  'input-error': confirmEmail && !emailsMatch,
                }"
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
            class="btn-primary"
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
import StateMessage from '@/components/atoms/StateMessage.vue';
import DateRangePicker from '@/components/molecules/DateRangePicker.vue';
import { useRoomStore } from '@/stores/roomStore';
import { useBookingStore } from '@/stores/bookingStore';

type BookingStep = 'form' | 'review';

const route = useRoute();
const router = useRouter();
const roomStore = useRoomStore();
const bookingStore = useBookingStore();

const room = computed(() => roomStore.selectedRoom);

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const confirmEmail = ref('');
const firstNameTouched = ref(false);
const lastNameTouched = ref(false);
const emailTouched = ref(false);
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

const firstNameValid = computed(() => firstName.value.trim() !== '');
const lastNameValid = computed(() => lastName.value.trim() !== '');
const emailValid = computed(() => emailRegex.test(email.value.trim()));

const emailsMatch = computed(
  () =>
    email.value.trim().toLowerCase() ===
    confirmEmail.value.trim().toLowerCase(),
);

const canProceed = computed(
  () =>
    !!room.value?.id &&
    nights.value > 0 &&
    roomStore.availability !== 'unavailable' &&
    roomStore.availability !== 'loading' &&
    firstNameValid.value &&
    lastNameValid.value &&
    emailValid.value &&
    emailsMatch.value,
);

function resetState() {
  bookingStore.resetBooking();
  roomStore.availability = 'unknown';
  step.value = 'form';
  firstName.value = '';
  lastName.value = '';
  email.value = '';
  confirmEmail.value = '';
  firstNameTouched.value = false;
  lastNameTouched.value = false;
  emailTouched.value = false;
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

    const bookingId = bookingStore.confirmation?.id;
    if (bookingId) {
      router.push(`/bookings/${bookingId}/confirmation`);
    }
  } catch {
    // error is already set in the store
  }
}

onMounted(loadRoom);

// Check availability as soon as the room is loaded and re-check whenever the
// timeframe changes, so the user sees availability before attempting to book.
watch(
  [() => room.value?.id, () => roomStore.checkIn, () => roomStore.checkOut],
  ([id, ci, co]) => {
    if (id && ci && co) {
      roomStore.checkAvailability(id, ci, co);
    }
  },
  { immediate: true },
);

watch(
  () => route.params.id,
  () => {
    resetState();
    loadRoom();
  },
);
</script>

<style scoped>
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

.section-heading {
  margin: 0 0 8px;
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

.availability {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
  margin-top: 4px;
}

.availability--loading {
  color: #8a8278;
}

.availability--available {
  color: #7fae7f;
}

.availability--unavailable {
  color: #d97766;
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
