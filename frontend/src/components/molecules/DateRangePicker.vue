<template>
  <div class="picker-root">
    <!-- drag handle -->
    <div class="picker-handle" />

    <!-- month navigation -->
    <div class="picker-nav">
      <button class="nav-btn" :disabled="isPrevDisabled" @click="prevMonth">
        <ion-icon name="chevron-back-outline" />
      </button>
      <h2 class="month-label">{{ monthLabel }}</h2>
      <button class="nav-btn" @click="nextMonth">
        <ion-icon name="chevron-forward-outline" />
      </button>
    </div>

    <!-- hint -->
    <p class="picker-hint">
      {{ awaitingCheckout ? 'Abreisedatum wählen' : 'Anreisedatum wählen' }}
    </p>

    <!-- calendar grid -->
    <div class="calendar-grid">
      <span v-for="h in DAY_HEADERS" :key="h" class="dow-header">{{ h }}</span>

      <template v-for="(day, idx) in calendarDays" :key="idx">
        <div v-if="!day" class="day-wrapper" />
        <div v-else class="day-wrapper" :class="dayWrapperClass(day)">
          <button
            class="day-cell"
            :class="dayCellClass(day)"
            :disabled="isDisabled(day)"
            @click="handleDayClick(day)"
          >
            {{ day.getDate() }}
          </button>
        </div>
      </template>
    </div>

    <!-- footer: selected dates + confirm -->
    <div class="picker-footer">
      <div class="picker-dates">
        <div class="picker-date-field" :class="{ 'picker-date-field--active': awaitingCheckout }">
          <span class="picker-date-label">Check-in</span>
          <span class="picker-date-val">{{ displayDate(store.checkIn) }}</span>
        </div>
        <span class="picker-date-sep">→</span>
        <div
          class="picker-date-field"
          :class="{ 'picker-date-field--active': !awaitingCheckout && !!store.checkOut }"
        >
          <span class="picker-date-label">Check-out</span>
          <span class="picker-date-val">{{ displayDate(store.checkOut) }}</span>
        </div>
      </div>
      <button class="confirm-btn" :disabled="!store.checkOut" @click="emit('close')">
        Übernehmen
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { IonIcon } from '@ionic/vue';
import { useRoomStore } from '@/stores/roomStore';

const emit = defineEmits<{ (e: 'close'): void }>();
const store = useRoomStore();

// ── helpers ──────────────────────────────────────────────────────────────────

function toDateStr(d: Date): string {
  return (
    `${d.getFullYear()}-` +
    `${String(d.getMonth() + 1).padStart(2, '0')}-` +
    `${String(d.getDate()).padStart(2, '0')}`
  );
}

const todayStr = toDateStr(new Date());

function displayDate(dateStr: string): string {
  if (!dateStr) return '—';
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// ── view state ────────────────────────────────────────────────────────────────

const refDate = store.checkIn ? new Date(store.checkIn + 'T00:00:00') : new Date();
const viewYear = ref(refDate.getFullYear());
const viewMonth = ref(refDate.getMonth());

// false = a complete range is shown; clicking any day restarts selection
const awaitingCheckout = ref(!store.checkIn || !store.checkOut);

// ── calendar data ─────────────────────────────────────────────────────────────

const DAY_HEADERS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

const monthLabel = computed(() =>
  new Date(viewYear.value, viewMonth.value, 1).toLocaleDateString('de-DE', {
    month: 'long',
    year: 'numeric',
  }),
);

const calendarDays = computed<(Date | null)[]>(() => {
  const y = viewYear.value;
  const m = viewMonth.value;
  const first = new Date(y, m, 1);
  const last = new Date(y, m + 1, 0);

  // Shift Sun=0 → Mon=0 … Sun=6
  let offset = first.getDay();
  offset = offset === 0 ? 6 : offset - 1;

  const days: (Date | null)[] = Array(offset).fill(null);
  for (let d = 1; d <= last.getDate(); d++) {
    days.push(new Date(y, m, d));
  }
  while (days.length % 7 !== 0) days.push(null);
  return days;
});

const isPrevDisabled = computed(() => {
  const now = new Date();
  return viewYear.value === now.getFullYear() && viewMonth.value === now.getMonth();
});

// ── navigation ────────────────────────────────────────────────────────────────

function prevMonth() {
  if (viewMonth.value === 0) { viewMonth.value = 11; viewYear.value--; }
  else viewMonth.value--;
}
function nextMonth() {
  if (viewMonth.value === 11) { viewMonth.value = 0; viewYear.value++; }
  else viewMonth.value++;
}

// ── day interaction ───────────────────────────────────────────────────────────

function isDisabled(day: Date): boolean {
  return toDateStr(day) < todayStr;
}

function handleDayClick(day: Date) {
  const dateStr = toDateStr(day);

  if (!awaitingCheckout.value) {
    // Start a fresh selection: set check-in, clear check-out
    store.setDates(dateStr, '');
    awaitingCheckout.value = true;
  } else {
    if (dateStr > store.checkIn) {
      // Complete the range
      store.setDates(store.checkIn, dateStr);
      awaitingCheckout.value = false;
      // Brief pause so the user sees the completed range, then close
      setTimeout(() => emit('close'), 200);
    } else {
      // Same or earlier than current check-in: reset to this day
      store.setDates(dateStr, '');
      // awaitingCheckout stays true
    }
  }
}

// ── CSS class helpers ─────────────────────────────────────────────────────────

function dayWrapperClass(day: Date) {
  const dateStr = toDateStr(day);
  const ci = store.checkIn;
  const co = store.checkOut;
  // Only render range decorations when both endpoints exist
  if (!ci || !co) return {};

  return {
    'range-start': dateStr === ci,
    'range-end': dateStr === co,
    'in-range': dateStr > ci && dateStr < co,
  };
}

function dayCellClass(day: Date) {
  const dateStr = toDateStr(day);
  const ci = store.checkIn;
  const co = store.checkOut;
  return {
    selected: dateStr === ci || (!!co && dateStr === co),
    disabled: isDisabled(day),
  };
}
</script>

<style scoped>
/* ── root ───────────────────────────────────────────────────────────────────── */
.picker-root {
  background: #1a1a1a;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding-bottom: env(safe-area-inset-bottom, 0);
}

/* ── handle ─────────────────────────────────────────────────────────────────── */
.picker-handle {
  width: 40px;
  height: 4px;
  background: rgba(255, 255, 255, 0.18);
  border-radius: 2px;
  margin: 14px auto 0;
  flex-shrink: 0;
}

/* ── navigation ─────────────────────────────────────────────────────────────── */
.picker-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 0;
  flex-shrink: 0;
}

.month-label {
  font-family: Georgia, 'Times New Roman', serif;
  font-style: italic;
  font-size: 17px;
  font-weight: 400;
  color: #f5f0e8;
  margin: 0;
  text-align: center;
}

.nav-btn {
  width: 36px;
  height: 36px;
  background: transparent;
  border: none;
  border-radius: 50%;
  color: #c9a96e;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  padding: 0;
}
.nav-btn:hover:not(:disabled) {
  background: rgba(201, 169, 110, 0.12);
}
.nav-btn:disabled {
  color: rgba(255, 255, 255, 0.18);
  cursor: default;
}

/* ── hint ────────────────────────────────────────────────────────────────────── */
.picker-hint {
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #c9a96e;
  margin: 8px 0 0;
  flex-shrink: 0;
}

/* ── calendar grid ──────────────────────────────────────────────────────────── */
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 6px 12px 0;
  flex: 1;
  align-content: start;
}

.dow-header {
  text-align: center;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  padding: 6px 0 4px;
}

/* ── day wrapper: owns the range background strip ────────────────────────────── */
.day-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
}

/* Range strip rendered via ::before on the wrapper */
.day-wrapper::before {
  content: '';
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 0;
  right: 0;
  background: transparent;
  pointer-events: none;
}

.day-wrapper.in-range::before {
  background: rgba(201, 169, 110, 0.15);
}

/* Half-strip on the right side only (range start) */
.day-wrapper.range-start::before {
  background: rgba(201, 169, 110, 0.15);
  left: 50%;
  right: 0;
  border-radius: 0;
}

/* Half-strip on the left side only (range end) */
.day-wrapper.range-end::before {
  background: rgba(201, 169, 110, 0.15);
  left: 0;
  right: 50%;
  border-radius: 0;
}

/* ── day cell: the circle button ─────────────────────────────────────────────── */
.day-cell {
  position: relative;
  z-index: 1;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: #f5f0e8;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.12s, color 0.12s;
  -webkit-tap-highlight-color: transparent;
}

.day-cell:hover:not(:disabled):not(.selected) {
  background: rgba(201, 169, 110, 0.18);
}

.day-cell.selected {
  background: #c9a96e;
  color: #111111;
  font-weight: 700;
}

.day-cell.disabled {
  color: rgba(255, 255, 255, 0.18);
  cursor: default;
  pointer-events: none;
}

/* ── footer ─────────────────────────────────────────────────────────────────── */
.picker-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-shrink: 0;
}

.picker-dates {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.picker-date-field {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.picker-date-label {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
  transition: color 0.15s;
}

.picker-date-field--active .picker-date-label {
  color: #c9a96e;
}

.picker-date-val {
  font-size: 13px;
  font-weight: 500;
  color: #f5f0e8;
  white-space: nowrap;
}

.picker-date-sep {
  color: rgba(255, 255, 255, 0.25);
  font-size: 14px;
  flex-shrink: 0;
}

.confirm-btn {
  background: #c9a96e;
  color: #111111;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: opacity 0.15s;
}

.confirm-btn:hover:not(:disabled) {
  opacity: 0.85;
}

.confirm-btn:disabled {
  opacity: 0.35;
  cursor: default;
}
</style>
