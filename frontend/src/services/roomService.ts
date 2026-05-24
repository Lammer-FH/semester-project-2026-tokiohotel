import axios from 'axios';
import type { Room, PaginatedRooms } from '@/types/api';
import { mockRooms, mockPaginatedRooms } from '@/mocks/roomMocks';

const USE_MOCK = true;

const BASE_URL = 'http://localhost:8080';

export interface RoomQuery {
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
}

export const roomService = {
  async getRooms(query: RoomQuery = {}): Promise<PaginatedRooms> {
    if (USE_MOCK) return mockPaginatedRooms;
    const { data } = await axios.get<PaginatedRooms>(`${BASE_URL}/rooms`, { params: query });
    return data;
  },

  async getRoomById(id: number): Promise<Room> {
    if (USE_MOCK) {
      const room = mockRooms.find((r) => r.id === id);
      if (!room) throw new Error(`Room with id ${id} not found`);
      return room;
    }
    const { data } = await axios.get<Room>(`${BASE_URL}/rooms/${id}`);
    return data;
  },
};
