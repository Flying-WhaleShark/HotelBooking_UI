import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { RoomContextValue } from '../types';
import { roomData } from '../data';
import { fetchRooms, type ApiRoom } from '../api';
import type { Room } from '../types';

const RoomInfo = createContext<RoomContextValue | null>(null);

function mapApiRoom(apiRoom: ApiRoom, defaultFacilities: Room['facilities']): Room {
  return {
    id: apiRoom.id,
    name: apiRoom.name,
    description: apiRoom.description,
    facilities: defaultFacilities,
    size: Math.max(30, apiRoom.capacity * 15),
    maxPerson: apiRoom.capacity,
    price: apiRoom.price,
    image: apiRoom.imageUrl,
    imageLg: apiRoom.imageUrl,
  };
}

export function RoomContext({ children }: { children: ReactNode }) {
  const [rooms, setRooms] = useState<Room[]>(roomData);
  const [initialRooms, setInitialRooms] = useState<Room[]>(roomData);
  const [loading, setLoading] = useState(false);
  const [adults, setAdults] = useState('1 Adult');
  const [kids, setKids] = useState('0 Kid');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(+adults[0] + +kids[0]);
  }, [adults, kids]);

  useEffect(() => {
    const loadRooms = async () => {
      setLoading(true);
      try {
        const apiRooms = await fetchRooms();
        const mappedRooms = apiRooms.map((apiRoom) =>
          mapApiRoom(apiRoom, roomData[0]?.facilities ?? []),
        );
        setInitialRooms(mappedRooms);
        setRooms(mappedRooms);
      } catch (error) {
        console.warn('Failed to load rooms from API, using local fallback data.', error);
        setInitialRooms(roomData);
        setRooms(roomData);
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  const resetRoomFilterData = () => {
    setAdults('1 Adult');
    setKids('0 Kid');
    setRooms(initialRooms);
  };

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const filterRooms = initialRooms.filter((room) => total <= room.maxPerson);
    setTimeout(() => {
      setLoading(false);
      setRooms(filterRooms);
    }, 3000);
  };

  const value: RoomContextValue = {
    rooms,
    loading,
    adults,
    setAdults,
    kids,
    setKids,
    handleCheck,
    resetRoomFilterData,
  };

  return <RoomInfo.Provider value={value}>{children}</RoomInfo.Provider>;
}

/* eslint-disable react-refresh/only-export-components -- context + hook in same file is a common pattern */
export function useRoomContext(): RoomContextValue {
  const ctx = useContext(RoomInfo);
  if (!ctx) throw new Error('useRoomContext must be used within RoomContext');
  return ctx;
}
