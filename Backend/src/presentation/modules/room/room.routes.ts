import { Router } from "express";
import { RoomController } from "./room.controller";

export class RoomRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new RoomController();

    router.get("/", controller.getAllRooms);
    router.get("/:id", controller.getRoomById);
    router.post("/", controller.createRoom);
    router.put("/:id", controller.updateRoom);
    router.delete("/:id", controller.deleteRoom);

    return router;
  }
}