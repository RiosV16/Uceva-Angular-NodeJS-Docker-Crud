import { CreateRoomDTO } from "./create-room.dto";

export class UpdateRoomDTO {
  static create(
    object: Record<string, unknown>
  ): [string | undefined, CreateRoomDTO?] {
    return CreateRoomDTO.create(object);
  }
}