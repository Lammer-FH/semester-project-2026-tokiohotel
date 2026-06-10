import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Room, PaginationMetadata } from '@/types/api';
import { roomService, type RoomQuery } from '@/services/roomService';

type AvailabilityStatus = 'available' | 'unavailable' | 'unknown' | 'loading';

function dayStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export const useRoomStore = defineStore('rooms', () => {
  const rooms = ref<Room[]>([]);
  const selectedRoom = ref<Room | null>(null);
  const pagination = ref<PaginationMetadata | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const availability = ref<AvailabilityStatus>('unknown');
  const availableRoomIds = ref<Set<number> | null>(null);

  const _today = new Date();
  const _tomorrow = new Date(_today);
  _tomorrow.setDate(_tomorrow.getDate() + 1);
  const checkIn = ref<string>(dayStr(_today));
  const checkOut = ref<string>(dayStr(_tomorrow));

  function setDates(ci: string, co: string) {
    checkIn.value = ci;
    checkOut.value = co;
  }

  async function fetchRooms(query: RoomQuery = {}) {
    loading.value = true;
    error.value = null;
    try {
      const result = await roomService.getRooms(query);
      rooms.value = result.content ?? [];
      pagination.value = {
        totalElements: result.totalElements,
        totalPages: result.totalPages,
        number: result.number,
        size: result.size,
      };
    } catch (e) {
      error.value = (e as Error).message;
    } finally {
      loading.value = false;
    }
  }

  async function fetchRoomById(id: number) {
    loading.value = true;
    error.value = null;
    try {
      selectedRoom.value = await roomService.getRoomById(id);
    } catch (e) {
      error.value = (e as Error).message;
    } finally {
      loading.value = false;
    }
  }

  async function checkAvailability(roomId: number, startDate: string, endDate: string) {
    if (!startDate || !endDate) {
      availability.value = 'unknown';
      return;
    }
    availability.value = 'loading';
    try {
      const result = await roomService.getRooms({ startDate, endDate, page: 0, size: 100 });
      const found = (result.content ?? []).some((r) => r.id === roomId);
      availability.value = found ? 'available' : 'unavailable';
    } catch {
      availability.value = 'unknown';
    }
  }

  async function fetchAvailableRoomIds(startDate: string, endDate: string) {
    if (!startDate || !endDate) {
      availableRoomIds.value = null;
      return;
    }
    try {
      const result = await roomService.getRooms({ startDate, endDate, page: 0, size: 100 });
      availableRoomIds.value = new Set(
        (result.content ?? []).map((r) => r.id).filter((id): id is number => id != null),
      );
    } catch {
      availableRoomIds.value = null;
    }
  }

  function getRoomAvailability(roomId: number | undefined): AvailabilityStatus {
    if (roomId == null || availableRoomIds.value === null) return 'unknown';
    return availableRoomIds.value.has(roomId) ? 'available' : 'unavailable';
  }

  return {
    rooms, selectedRoom, pagination, loading, error, availability, availableRoomIds,
    fetchRooms, fetchRoomById, checkAvailability, fetchAvailableRoomIds, getRoomAvailability,
    checkIn, checkOut, setDates,
  };
});
