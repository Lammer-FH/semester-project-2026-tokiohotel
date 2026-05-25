import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Room, PaginationMetadata } from '@/types/api';
import { roomService, type RoomQuery } from '@/services/roomService';

export const useRoomStore = defineStore('rooms', () => {
  const rooms = ref<Room[]>([]);
  const selectedRoom = ref<Room | null>(null);
  const pagination = ref<PaginationMetadata | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchRooms(query: RoomQuery = {}) {
    loading.value = true;
    error.value = null;
    try {
      const result = await roomService.getRooms(query);
      rooms.value = result.content ?? [];
      pagination.value = result.pagination ?? null;
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

  return { rooms, selectedRoom, pagination, loading, error, fetchRooms, fetchRoomById };
});
