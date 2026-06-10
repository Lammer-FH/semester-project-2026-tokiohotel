import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Booking, BookingRequest } from '@/types/api';
import { bookingService } from '@/services/bookingService';

export const useBookingStore = defineStore('booking', () => {
  const confirmation = ref<Booking | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function createBooking(req: BookingRequest) {
    loading.value = true;
    error.value = null;
    try {
      confirmation.value = await bookingService.createBooking(req);
    } catch (e: unknown) {
      const status = (e as { response?: { status?: number } }).response?.status;

      if (status === 409) {
        error.value = 'Zimmer im gewählten Zeitraum nicht verfügbar.';
      } else if (status === 400) {
        error.value = 'Ungültige Eingaben. Bitte prüfen Sie Ihre Angaben.';
      } else if (status === 404) {
        error.value = 'Zimmer nicht gefunden.';
      } else {
        error.value =
          'Buchung fehlgeschlagen. Bitte prüfen Sie Ihre Verbindung und versuchen Sie es erneut.';
      }
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function fetchBookingById(id: number) {
    loading.value = true;
    error.value = null;
    try {
      confirmation.value = await bookingService.getBookingById(id);
    } catch (e) {
      error.value = (e as Error).message;
    } finally {
      loading.value = false;
    }
  }

  function resetBooking() {
    confirmation.value = null;
    error.value = null;
  }

  return { confirmation, loading, error, createBooking, fetchBookingById, resetBooking };
});
