import { Request, Response } from "express";
import { RoomService } from "./room.service";
import { HandleError } from "../../../domain/errors/handle.error";
import { CreateRoomDTO } from "../../../domain/dtos/create-room.dto";
import { UpdateRoomDTO } from "../../../domain/dtos/update-room.dto";

export class RoomController {
  private readonly roomService = new RoomService();

  getAllRooms = async (_req: Request, res: Response): Promise<void> => {
    try {
      const rooms = await this.roomService.getAllRooms();
      res.status(200).json(rooms);
    } catch (error) {
      HandleError.error(error, res);
    }
  };

  getRoomById = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      res.status(400).json({ error: "El ID debe ser un entero positivo" });
      return;
    }

    try {
      const room = await this.roomService.getRoomById(id);
      res.status(200).json(room);
    } catch (error) {
      HandleError.error(error, res);
    }
  };

  createRoom = async (req: Request, res: Response): Promise<void> => {
    const [error, roomDTO] = CreateRoomDTO.create(req.body ?? {});

    if (error || !roomDTO) {
      res.status(400).json({ error });
      return;
    }

    try {
      const room = await this.roomService.createRoom(roomDTO);
      res.status(201).json(room);
    } catch (error) {
      HandleError.error(error, res);
    }
  };

  updateRoom = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      res.status(400).json({ error: "El ID debe ser un entero positivo" });
      return;
    }

    const [error, roomDTO] = UpdateRoomDTO.create(req.body ?? {});

    if (error || !roomDTO) {
      res.status(400).json({ error });
      return;
    }

    try {
      const room = await this.roomService.updateRoom(id, roomDTO);
      res.status(200).json(room);
    } catch (error) {
      HandleError.error(error, res);
    }
  };

  deleteRoom = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      res.status(400).json({ error: "El ID debe ser un entero positivo" });
      return;
    }

    try {
      await this.roomService.deleteRoom(id);
      res.status(200).json({ message: "Salon eliminado correctamente" });
    } catch (error) {
      HandleError.error(error, res);
    }
  };
}