import { pool } from "../../../config/database";
import { CustomError } from "../../../domain/errors/custom.error";
import {
  Room,
  CreateRoom,
  UpdateRoom
} from "../../../domain/interfaces/room.interface";

export class RoomService {
  // GET ALL
  public async getAllRooms(): Promise<Room[]> {
    const sql = `
      SELECT *
      FROM rooms
      ORDER BY id;
    `;
    const result = await pool.query<Room>(sql);
    return result.rows;
  }

  // GET BY ID
  public async getRoomById(id: number): Promise<Room> {
    const sql = `
      SELECT *
      FROM rooms
      WHERE id = $1;
    `;
    const result = await pool.query<Room>(sql, [id]);
    const room = result.rows[0];

    if (!room) {
      throw CustomError.notFound("Salon no encontrado");
    }

    return room;
  }

  // CREATE
  public async createRoom(room: CreateRoom): Promise<Room> {
    const sql = `
      INSERT INTO rooms (
        code,
        building,
        capacity,
        available
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [
      room.code,
      room.building,
      room.capacity,
      room.available
    ];

    try {
      const result = await pool.query<Room>(sql, values);
      const createdRoom = result.rows[0];

      if (!createdRoom) {
        throw CustomError.internalServer("No se pudo crear el salon");
      }

      return createdRoom;
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "23505"
      ) {
        throw CustomError.conflict("Ya existe un salon con ese codigo");
      }
      throw error;
    }
  }

  // UPDATE
  public async updateRoom(id: number, room: UpdateRoom): Promise<Room> {
    const sql = `
      UPDATE rooms
      SET
        code = $1,
        building = $2,
        capacity = $3,
        available = $4
      WHERE id = $5
      RETURNING *;
    `;
    const values = [
      room.code,
      room.building,
      room.capacity,
      room.available,
      id
    ];

    try {
      const result = await pool.query<Room>(sql, values);
      const updatedRoom = result.rows[0];

      if (!updatedRoom) {
        throw CustomError.notFound("Salon no encontrado");
      }

      return updatedRoom;
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "23505"
      ) {
        throw CustomError.conflict("Ya existe un salon con ese codigo");
      }
      throw error;
    }
  }

  // DELETE
  public async deleteRoom(id: number): Promise<boolean> {
    const sql = `
      DELETE FROM rooms
      WHERE id = $1
      RETURNING id;
    `;
    const result = await pool.query(sql, [id]);

    if (result.rowCount === 0) {
      throw CustomError.notFound("Salon no encontrado");
    }

    return true;
  }
}