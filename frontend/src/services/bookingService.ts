import axios from "axios";
import type { Booking, BookingRequest } from "@/types/api";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Access-Control-Allow-Origin": "*" },
});

export const bookingService = {
  async createBooking(req: BookingRequest): Promise<Booking> {
    const { data } = await api.post<Booking>("/bookings", req);
    return data;
  },

  async getBookingById(id: number): Promise<Booking> {
    const { data } = await api.get<Booking>(`/bookings/${id}`);
    return data;
  },
};
