import type { IconType } from 'react-icons';

/** Single facility item (e.g. Wifi, Coffee) with name and icon for room details */
export interface Facility {
  name: string;
  icon: IconType;
}

/** Room entity used in listing and detail views */
export interface Room {
  id: number;
  name: string;
  description: string;
  facilities: Facility[];
  size: number;
  maxPerson: number;
  price: number;
  image: string;
  imageLg: string;
}
