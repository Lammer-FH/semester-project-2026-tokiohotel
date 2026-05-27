import axios from 'axios';
import type { Room, PaginatedRooms } from '@/types/api';
import { mockPaginatedRooms } from '@/mocks/roomMocks';

const api = axios.create({ baseURL: 'http://localhost:8080' });

// --- Mock interceptor: remove this block to switch to the real API ---
api.interceptors.request.use((config) => {
  const url = config.url ?? '';
  const byId = url.match(/^\/rooms\/(\d+)$/);

  if (byId) {
    const id = parseInt(byId[1], 10);
    const room = mockPaginatedRooms.content?.find((r) => r.id === id);
    config.adapter = async () => {
      if (!room) throw new Error(`Room ${id} not found`);
      return { data: room, status: 200, statusText: 'OK', headers: {}, config, request: null };
    };
  } else if (url === '/rooms') {
    config.adapter = async () => ({
      data: mockPaginatedRooms,
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
      request: null,
    });
  }

  return config;
});
// --- end mock interceptor ---

export interface RoomQuery {
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
}

export const roomService = {
  async getRooms(query: RoomQuery = {}): Promise<PaginatedRooms> {
    const { data } = await api.get<PaginatedRooms>('/rooms', { params: query });
    return data;
  },

  async getRoomById(id: number): Promise<Room> {
    const { data } = await api.get<Room>(`/rooms/${id}`);
    return data;
  },
};
