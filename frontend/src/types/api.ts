export interface Guest {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
}

export interface Extra {
  id?: number;
  name?: string;
  icon?: string;
}

export interface RoomType {
  id?: number;
  title?: string;
  description?: string;
  capacity?: number;
  cost?: number;
  images?: string[];
  extras?: Extra[];
}

export interface Room {
  id?: number;
  room_number?: string;
  room_type?: RoomType;
}

export interface Booking {
  id?: number;
  guest?: Guest;
  room?: Room;
  total_cost?: number;
  booking_date?: string;
  start_date?: string;
  end_date?: string;
  with_breakfast?: boolean;
}

export interface BookingRequest {
  room_id: number;
  start_date: string;
  end_date: string;
  first_name: string;
  last_name: string;
  email: string;
  with_breakfast?: boolean;
}

export interface Confirmation {
  booking_id?: number;
}

export interface PaginationMetadata {
  totalElements?: number;
  totalPages?: number;
  currentPage?: number;
  pageSize?: number;
}

export interface PaginatedRooms {
  content?: Room[];
  pagination?: PaginationMetadata;
}
