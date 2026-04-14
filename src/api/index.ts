/**
 * API layer: Backend integration for hotel booking.
 * Uses Vite env variable VITE_API_URL or falls back to /api for local proxy.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export interface ApiRoom {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  capacity: number;
}

export interface Booking {
  id: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  guestName: string;
  guestEmail: string;
}

/**
 * Fetch all available rooms from the backend API.
 */
export async function fetchRooms(): Promise<ApiRoom[]> {
  const res = await fetch(`${API_BASE_URL}/rooms`);
  if (!res.ok) {
    throw new Error(`Failed to fetch rooms: ${res.status}`);
  }
  return res.json();
}

/**
 * Fetch a specific room by ID from the backend API.
 */
export async function fetchRoomById(id: string): Promise<ApiRoom> {
  const res = await fetch(`${API_BASE_URL}/rooms/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch room: ${res.status}`);
  }
  return res.json();
}

/**
 * Create a new booking.
 */
export async function createBooking(booking: Omit<Booking, 'id'>): Promise<Booking> {
  const res = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(booking),
  });
  if (!res.ok) {
    throw new Error(`Failed to create booking: ${res.status}`);
  }
  return res.json();
}

/**
 * Fetch all bookings (admin).
 */
export async function fetchBookings(): Promise<Booking[]> {
  const res = await fetch(`${API_BASE_URL}/bookings`);
  if (!res.ok) {
    throw new Error(`Failed to fetch bookings: ${res.status}`);
  }
  return res.json();
}

/**
 * Cancel a booking.
 */
export async function cancelBooking(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/bookings/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error(`Failed to cancel booking: ${res.status}`);
  }
}
