import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Room, PaginationMetadata } from '@/types/api';
import { roomService, type RoomQuery } from '@/services/roomService';

function dayStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export const useRoomStore = defineStore('rooms', () => {
  const rooms = ref<Room[]>([]);
  const selectedRoom = ref<Room | null>(null);
  const pagination = ref<PaginationMetadata | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

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

  return { rooms, selectedRoom, pagination, loading, error, fetchRooms, fetchRoomById, checkIn, checkOut, setDates };
});
