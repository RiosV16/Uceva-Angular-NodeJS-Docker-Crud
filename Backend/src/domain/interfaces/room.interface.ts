export interface Room {
  id: number;
  code: string;
  building: string;
  capacity: number;
  available: boolean;
}

export type CreateRoom = Omit<Room, "id">;
export type UpdateRoom = Omit<Room, "id">;