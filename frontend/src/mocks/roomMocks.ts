import type { Room, PaginatedRooms } from '@/types/api';

export const mockRooms: Room[] = [
  {
    id: 1,
    room_number: '101',
    room_type: {
      id: 1,
      title: 'Standard Room',
      description: 'Gemütliches Einzelzimmer mit Stadtblick und moderner Einrichtung. Ideal für Alleinreisende.',
      capacity: 1,
      cost: 89.99,
      images: ['https://placehold.co/600x400?text=Standard+Room'],
      extras: [
        { id: 1, name: 'WLAN', icon: 'wifi-outline' },
        { id: 2, name: 'TV', icon: 'tv-outline' },
      ],
    },
  },
  {
    id: 2,
    room_number: '202',
    room_type: {
      id: 2,
      title: 'Double Room',
      description: 'Geräumiges Doppelzimmer mit Queensize-Bett und Gartenblick. Perfekt für Paare.',
      capacity: 2,
      cost: 129.99,
      images: ['https://placehold.co/600x400?text=Double+Room'],
      extras: [
        { id: 1, name: 'WLAN', icon: 'wifi-outline' },
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
      title: 'Deluxe',
      description: 'Stilvolles Deluxe-Zimmer mit elegantem Design, Kingsize-Bett und exklusivem Stadtpanorama.',
      capacity: 2,
      cost: 199.99,
      images: ['https://placehold.co/600x400?text=Deluxe'],
      extras: [
        { id: 1, name: 'WLAN', icon: 'wifi-outline' },
        { id: 2, name: 'TV', icon: 'tv-outline' },
        { id: 3, name: 'Minibar', icon: 'wine-outline' },
        { id: 4, name: 'Frühstück', icon: 'restaurant-outline' },
      ],
    },
  },
  {
    id: 4,
    room_number: '401',
    room_type: {
      id: 4,
      title: 'Suite',
      description: 'Luxuriöse Suite mit separatem Wohnbereich, Kingsize-Bett, Whirlpool und Panoramablick.',
      capacity: 2,
      cost: 299.99,
      images: ['https://placehold.co/600x400?text=Suite'],
      extras: [
        { id: 1, name: 'WLAN', icon: 'wifi-outline' },
        { id: 2, name: 'TV', icon: 'tv-outline' },
        { id: 3, name: 'Minibar', icon: 'wine-outline' },
        { id: 4, name: 'Whirlpool', icon: 'water-outline' },
        { id: 5, name: 'Frühstück', icon: 'restaurant-outline' },
      ],
    },
  },
  {
    id: 5,
    room_number: '505',
    room_type: {
      id: 5,
      title: 'Family Room',
      description: 'Großes Familienzimmer mit zwei getrennten Schlafbereichen, Kinderbett und Spielecke.',
      capacity: 4,
      cost: 189.99,
      images: ['https://placehold.co/600x400?text=Family+Room'],
      extras: [
        { id: 1, name: 'WLAN', icon: 'wifi-outline' },
        { id: 2, name: 'TV', icon: 'tv-outline' },
        { id: 5, name: 'Kinderbett', icon: 'bed-outline' },
      ],
    },
  },
  {
    id: 6,
    room_number: '606',
    room_type: {
      id: 6,
      title: 'Double Room',
      description: 'Klassisches Doppelzimmer mit zwei Einzelbetten, ideal für Geschäftsreisende und Freunde.',
      capacity: 2,
      cost: 119.99,
      images: ['https://placehold.co/600x400?text=Double+Room+Deluxe'],
      extras: [
        { id: 1, name: 'WLAN', icon: 'wifi-outline' },
        { id: 2, name: 'TV', icon: 'tv-outline' },
        { id: 6, name: 'Schreibtisch', icon: 'laptop-outline' },
      ],
    },
  },
];

export const mockPaginatedRooms: PaginatedRooms = {
  content: mockRooms,
  pagination: {
    totalElements: 6,
    totalPages: 2,
    currentPage: 0,
    pageSize: 5,
  },
};
