import axios from "axios";
import type { Room, PaginatedRooms } from "@/types/api";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Access-Control-Allow-Origin": "*" },
});

export interface RoomQuery {
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
}

export const roomService = {
  async getRooms(query: RoomQuery = {}): Promise<PaginatedRooms> {
    console.log("Searching rooms");
    const { data } = await api.get<PaginatedRooms>("/rooms", { params: query });
    console.log("----- Room Data recieved: ", data);
    return data;
  },

  async getRoomById(id: number): Promise<Room> {
    const { data } = await api.get<Room>(`/rooms/${id}`);
    return data;
  },
};
