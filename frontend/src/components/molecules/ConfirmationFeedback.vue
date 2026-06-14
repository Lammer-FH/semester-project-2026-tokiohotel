<template>
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonButton, IonTextarea } from '@ionic/vue';

const props = defineProps<{ bookingId?: number }>();

const feedbackRating = ref(0);
const hoverRating = ref(0);
const feedbackText = ref('');
const feedbackSent = ref(false);

function sendFeedback() {
  if (feedbackRating.value === 0) return;
  console.log('Feedback:', { rating: feedbackRating.value, text: feedbackText.value, bookingId: props.bookingId });
  feedbackSent.value = true;
}
</script>

<style scoped>
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

@media print {
  .no-print {
    display: none !important;
  }
}
</style>
