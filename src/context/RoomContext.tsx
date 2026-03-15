import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { RoomContextValue } from '../types';
import { roomData } from '../data';

const RoomInfo = createContext<RoomContextValue | null>(null);

/**
 * RoomContext provides room list, loading state, guest counts (adults/kids),
 * and check/reset actions. Used for filtering rooms by capacity.
 */
export function RoomContext({ children }: { children: ReactNode }) {
  const [rooms, setRooms] = useState(roomData);
  const [loading, setLoading] = useState(false);
  const [adults, setAdults] = useState('1 Adult');
  const [kids, setKids] = useState('0 Kid');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(+adults[0] + +kids[0]);
  }, [adults, kids]);

  const resetRoomFilterData = () => {
    setAdults('1 Adult');
    setKids('0 Kid');
    setRooms(roomData);
  };

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const filterRooms = roomData.filter((room) => total <= room.maxPerson);
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
