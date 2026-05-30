<template>
  <ion-page>
    <ion-content :fullscreen="false">
      <AppHeader :dark="true" />
      <div class="booking-page">
        <div v-if="store.loading && !room" class="state-message">Zimmer wird geladen…</div>

        <div v-else-if="!room" class="state-message">Zimmer nicht gefunden.</div>

        <!-- Inline confirmation -->
        <section v-else-if="confirmation" class="confirmation-panel">
          <h1 class="section-heading">Buchung #{{ confirmation.id }} bestätigt</h1>
          <dl class="confirmation-details">
            <div class="conf-row">
              <dt>Zimmer</dt>
              <dd>{{ confirmation.room?.roomType?.title }} (Nr. {{ confirmation.room?.roomNumber }})</dd>
            </div>
            <div class="conf-row">
              <dt>Zeitraum</dt>
              <dd>{{ confirmation.startDate }} → {{ confirmation.endDate }}</dd>
            </div>
            <div class="conf-row">
              <dt>Gast</dt>
              <dd>{{ confirmation.guest?.firstName }} {{ confirmation.guest?.lastName }} ({{ confirmation.guest?.email }})</dd>
            </div>
            <div class="conf-row">
              <dt>Frühstück</dt>
              <dd>{{ confirmation.withBreakfast ? "Ja" : "Nein" }}</dd>
            </div>
            <div class="conf-row total">
              <dt>Gesamt</dt>
              <dd>€{{ Number(confirmation.totalCost).toFixed(2) }}</dd>
            </div>
          </dl>
          <ion-button expand="block" class="primary-btn" @click="router.push('/')">
            Zurück zur Startseite
          </ion-button>
        </section>

        <!-- Booking form -->
        <section v-else class="booking-form">
          <header class="form-header">
            <h1 class="section-heading">Buchen</h1>
            <p class="room-summary">
              {{ room.roomType?.title }} · Zimmer {{ room.roomNumber }} · €{{ room.roomType?.cost?.toFixed(2) }} / Nacht
            </p>
          </header>

          <div class="form-grid">
            <!-- Dates -->
            <div class="form-row">
              <span class="field-label">Zeitraum</span>
              <div class="date-trigger" @click="isPickerOpen = true">
                <span class="date-value">{{ formattedCheckIn }} → {{ formattedCheckOut }}</span>
                <span class="date-nights">{{ nights }} {{ nights === 1 ? "Nacht" : "Nächte" }}</span>
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

          <p v-if="error" class="form-error">{{ error }}</p>

          <ion-button
            expand="block"
            class="primary-btn"
            :disabled="!canSubmit || submitting"
            @click="submit"
          >
            {{ submitting ? "Wird gebucht…" : "Jetzt buchen" }}
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
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  IonPage,
  IonContent,
  IonButton,
  IonInput,
  IonToggle,
  IonModal,
} from "@ionic/vue";
import AppHeader from "@/components/organism/AppHeader.vue";
import DateRangePicker from "@/components/molecules/DateRangePicker.vue";
import { useRoomStore } from "@/stores/roomStore";
import { bookingService } from "@/services/bookingService";
import type { Booking } from "@/types/api";

const route = useRoute();
const router = useRouter();
const store = useRoomStore();

const room = computed(() => store.selectedRoom);

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const withBreakfast = ref(false);

const isPickerOpen = ref(false);
const submitting = ref(false);
const error = ref<string | null>(null);
const confirmation = ref<Booking | null>(null);

function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const formattedCheckIn = computed(() => formatDate(store.checkIn));
const formattedCheckOut = computed(() => formatDate(store.checkOut));

const nights = computed(() => {
  if (!store.checkIn || !store.checkOut) return 0;
  const a = new Date(store.checkIn).getTime();
  const b = new Date(store.checkOut).getTime();
  const diff = Math.round((b - a) / 86400000);
  return diff > 0 ? diff : 0;
});

const total = computed(() => {
  const perNight = room.value?.roomType?.cost ?? 0;
  return (perNight + (withBreakfast.value ? 15 : 0)) * nights.value;
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const canSubmit = computed(
  () =>
    !!room.value?.id &&
    nights.value > 0 &&
    firstName.value.trim() !== "" &&
    lastName.value.trim() !== "" &&
    emailRegex.test(email.value.trim()),
);

function resetState() {
  confirmation.value = null;
  error.value = null;
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  withBreakfast.value = false;
}

function loadRoom() {
  const id = Number(route.params.id);
  if (!Number.isNaN(id)) {
    store.fetchRoomById(id);
  }
}

async function submit() {
  if (!canSubmit.value || !room.value?.id) return;
  submitting.value = true;
  error.value = null;
  try {
    const booking = await bookingService.createBooking({
      roomId: room.value.id,
      startDate: store.checkIn,
      endDate: store.checkOut,
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value.trim(),
      withBreakfast: withBreakfast.value,
    });
    confirmation.value = booking;
  } catch (e: unknown) {
    const status = (e as { response?: { status?: number } }).response?.status;
    if (status === 409) {
      error.value = "Zimmer im gewählten Zeitraum nicht verfügbar.";
    } else if (status === 400) {
      error.value = "Ungültige Eingaben. Bitte prüfen.";
    } else if (status === 404) {
      error.value = "Zimmer nicht gefunden.";
    } else {
      error.value = "Buchung fehlgeschlagen. Bitte erneut versuchen.";
    }
  } finally {
    submitting.value = false;
  }
}

onMounted(loadRoom);
watch(() => route.params.id, () => {
  resetState();
  loadRoom();
});
</script>

<style scoped>
.booking-page {
  background: #111111;
  min-height: 100vh;
  padding: 32px 24px 64px;
  max-width: 720px;
  margin: 0 auto;
}

.state-message {
  padding: 64px 24px;
  text-align: center;
  color: #a0998a;
  font-size: 15px;
}

.section-heading {
  font-family: Georgia, "Times New Roman", serif;
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

.form-error {
  color: #d97766;
  font-size: 14px;
  margin: 0 0 16px;
  padding: 12px 16px;
  background: rgba(217, 119, 102, 0.1);
  border-left: 3px solid #d97766;
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
