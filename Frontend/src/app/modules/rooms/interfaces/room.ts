
export interface Room {
  id: number;
  code: string;
  building: string;
  capacity: number;
  available: boolean;
}

export type CreateRoomRequest = Omit<Room, 'id'>;
export type UpdateRoomRequest = Omit<Room, 'id'>;
