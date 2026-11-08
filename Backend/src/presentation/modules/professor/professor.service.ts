
import { pool } from "../../../config/database";
import { CustomError } from "../../../domain/errors/custom.error";

import {
  Professor,
  CreateProfessor,
  UpdateProfessor
} from "../../../domain/interfaces/professor.interface";

export class ProfessorService {

  // GET ALL: consultar todos los profesores
  public async getAllProfessors(): Promise<Professor[]> {

    const sql = `
      SELECT *
      FROM professors
      ORDER BY id;
    `;

    const result = await pool.query<Professor>(sql);

    return result.rows;
  }

  // GET BY ID: consultar un profesor
  public async getProfessorById(
    id: number
  ): Promise<Professor> {

    const sql = `
      SELECT *
      FROM professors
      WHERE id = $1;
    `;

    const result = await pool.query<Professor>(
      sql,
      [id]
    );

    const professor = result.rows[0];

    if (!professor) {
      throw CustomError.notFound(
        "Profesor no encontrado"
      );
    }

    return professor;
  }

  // CREATE: registrar un profesor
  public async createProfessor(
    professor: CreateProfessor
  ): Promise<Professor> {

    const sql = `
      INSERT INTO professors (
        name,
        email,
        specialty,
        status
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const values = [
      professor.name,
      professor.email,
      professor.specialty,
      professor.status
    ];

    try {

      const result = await pool.query<Professor>(
        sql,
        values
      );

     
const professorCreated = result.rows[0];

if (!professorCreated) {
  throw CustomError.internalServer(
    "No se pudo crear el profesor"
  );
}

return professorCreated;


    } catch (error: unknown) {

      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "23505"
      ) {
        throw CustomError.conflict(
          "Ya existe un profesor con ese correo"
        );
      }

      throw error;
    }
  }

  // UPDATE: actualizar un profesor
  public async updateProfessor(
    id: number,
    professor: UpdateProfessor
  ): Promise<Professor> {

    const sql = `
      UPDATE professors
      SET
        name = $1,
        email = $2,
        specialty = $3,
        status = $4
      WHERE id = $5
      RETURNING *;
    `;

    const values = [
      professor.name,
      professor.email,
      professor.specialty,
      professor.status,
      id
    ];

    try {

      const result = await pool.query<Professor>(
        sql,
        values
      );

      const updatedProfessor = result.rows[0];

      if (!updatedProfessor) {
        throw CustomError.notFound(
          "Profesor no encontrado"
        );
      }

      return updatedProfessor;

    } catch (error: unknown) {

      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "23505"
      ) {
        throw CustomError.conflict(
          "El correo ya está registrado"
        );
      }

      throw error;
    }
  }

  // DELETE: eliminar un profesor
  public async deleteProfessor(
    id: number
  ): Promise<boolean> {

    const sql = `
      DELETE FROM professors
      WHERE id = $1
      RETURNING id;
    `;

    const result = await pool.query(
      sql,
      [id]
    );

    if (result.rowCount === 0) {
      throw CustomError.notFound(
        "Profesor no encontrado"
      );
    }

    return true;
  }
}
