<template>
  <section class="feedback-section">
    <h2 class="section-label">Lass uns Feedback da</h2>

    <div class="feedback-card">
      <div class="star-rating">
        <button
          v-for="star in 5"
          :key="star"
          type="button"
          class="star-btn"
          :class="{ active: star <= (hoverRating || rating) }"
          @mouseenter="hoverRating = star"
          @mouseleave="hoverRating = 0"
          @click="rating = star"
        >
          ★
        </button>
      </div>

      <ion-textarea
        v-model="text"
        placeholder="Optionaler Kommentar…"
        class="feedback-textarea"
        :rows="3"
        :auto-grow="true"
      />

      <ion-button
        expand="block"
        class="btn-primary"
        :disabled="rating === 0 || sent"
        @click="submit"
      >
        {{ sent ? 'Danke für Ihr Feedback!' : 'Feedback senden' }}
      </ion-button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonButton, IonTextarea } from '@ionic/vue';

const props = defineProps<{ bookingId?: number }>();

const rating = ref(0);
const hoverRating = ref(0);
const text = ref('');
const sent = ref(false);

function submit() {
  if (rating.value === 0) return;
  console.log('Feedback:', { rating: rating.value, text: text.value, bookingId: props.bookingId });
  sent.value = true;
}
</script>

<style scoped>
.section-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #c9a96e;
  font-weight: 700;
  margin: 0;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 16px;
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
</style>
