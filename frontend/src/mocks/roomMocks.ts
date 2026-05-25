import type { Room, PaginatedRooms } from '@/types/api';

export const mockRooms: Room[] = [
  {
    id: 1,
    room_number: '101',
    room_type: {
      id: 1,
      title: 'Standard Single',
      description: 'Gemütliches Einzelzimmer mit Stadtblick und moderner Einrichtung.',
      capacity: 1,
      cost: 89.99,
      images: ['https://placehold.co/600x400?text=Standard+Single'],
      extras: [
        { id: 1, name: 'WLAN', icon: 'wifi' },
        { id: 2, name: 'TV', icon: 'tv-outline' },
      ],
    },
  },
  {
    id: 2,
    room_number: '202',
    room_type: {
      id: 2,
      title: 'Standard Double',
      description: 'Geräumiges Doppelzimmer mit Queensize-Bett und Gartenblick.',
      capacity: 2,
      cost: 129.99,
      images: ['https://placehold.co/600x400?text=Standard+Double'],
      extras: [
        { id: 1, name: 'WLAN', icon: 'wifi' },
        { id: 2, name: 'TV', icon: 'tv-outline' },
        { id: 3, name: 'Minibar', icon: 'wine-outline' },
      ],
    },
  },
  {
    id: 3,
    room_number: '303',
    room_type: {
      id: 3,
      title: 'Deluxe Suite',
      description: 'Luxuriöse Suite mit Wohnbereich, Kingsize-Bett und Panoramablick.',
      capacity: 2,
      cost: 249.99,
      images: ['https://placehold.co/600x400?text=Deluxe+Suite'],
      extras: [
        { id: 1, name: 'WLAN', icon: 'wifi' },
        { id: 2, name: 'TV', icon: 'tv-outline' },
        { id: 3, name: 'Minibar', icon: 'wine-outline' },
        { id: 4, name: 'Whirlpool', icon: 'water-outline' },
      ],
    },
  },
  {
    id: 4,
    room_number: '404',
    room_type: {
      id: 4,
      title: 'Family Room',
      description: 'Großes Familienzimmer mit zwei Schlafbereichen und Spielecke.',
      capacity: 4,
      cost: 189.99,
      images: ['https://placehold.co/600x400?text=Family+Room'],
      extras: [
        { id: 1, name: 'WLAN', icon: 'wifi' },
        { id: 2, name: 'TV', icon: 'tv-outline' },
        { id: 5, name: 'Kinderbett', icon: 'bed-outline' },
      ],
    },
  },
  {
    id: 5,
    room_number: '501',
    room_type: {
      id: 5,
      title: 'Penthouse',
      description: 'Exklusives Penthouse auf der obersten Etage mit privatem Dachterrassenpool.',
      capacity: 3,
      cost: 499.99,
      images: ['https://placehold.co/600x400?text=Penthouse'],
      extras: [
        { id: 1, name: 'WLAN', icon: 'wifi' },
        { id: 2, name: 'TV', icon: 'tv-outline' },
        { id: 3, name: 'Minibar', icon: 'wine-outline' },
        { id: 4, name: 'Whirlpool', icon: 'water-outline' },
        { id: 6, name: 'Butler Service', icon: 'person-outline' },
      ],
    },
  },
];

export const mockPaginatedRooms: PaginatedRooms = {
  content: mockRooms,
  pagination: {
    totalElements: mockRooms.length,
    totalPages: 1,
    currentPage: 0,
    pageSize: 5,
  },
};
