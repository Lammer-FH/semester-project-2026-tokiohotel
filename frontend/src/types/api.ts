export interface Guest {
  id?: number;
  firstName?: string;
  lastName?: string;
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
  images?: string;
  extras?: Extra[];
}

export interface Room {
  id?: number;
  roomNumber?: string;
  roomType?: RoomType;
}

export interface Booking {
  id?: number;
  guest?: Guest;
  room?: Room;
  totalCost?: number;
  bookingDate?: string;
  startDate?: string;
  endDate?: string;
  withBreakfast?: boolean;
}

export interface BookingRequest {
  roomId: number;
  startDate: string;
  endDate: string;
  firstName: string;
  lastName: string;
  email: string;
  withBreakfast?: boolean;
}

export interface Confirmation {
  bookingId?: number;
}

export interface PaginationMetadata {
  totalElements?: number;
  totalPages?: number;
  number?: number;
  size?: number;
}

export interface PaginatedRooms {
  content?: Room[];
  totalElements?: number;
  totalPages?: number;
  number?: number;
  size?: number;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  empty?: boolean;
}
