
import { Request, Response } from "express";

import { ProfessorService } from "./professor.service";

import { HandleError } from "../../../domain/errors/handle.error";

import { CreateProfessorDTO } from "../../../domain/dtos/create-professor.dto";

import { UpdateProfessorDTO } from "../../../domain/dtos/update-professor.dto";

export class ProfessorController {

  private readonly professorService = new ProfessorService();

  // GET ALL
  getAllProfessors = async (
    _req: Request,
    res: Response
  ): Promise<void> => {

    try {

      const professors =
        await this.professorService.getAllProfessors();

      res.status(200).json(professors);

    } catch (error) {

      HandleError.error(error, res);
    }
  };

  // GET BY ID
  getProfessorById = async (
    req: Request,
    res: Response
  ): Promise<void> => {

    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      res.status(400).json({
        error: "El ID debe ser un entero positivo"
      });
      return;
    }

    try {

      const professor =
        await this.professorService.getProfessorById(id);

      res.status(200).json(professor);

    } catch (error) {

      HandleError.error(error, res);
    }
  };

  // CREATE
  createProfessor = async (
    req: Request,
    res: Response
  ): Promise<void> => {

    const [error, professorDTO] =
      CreateProfessorDTO.create(req.body ?? {});

    if (error || !professorDTO) {
      res.status(400).json({ error });
      return;
    }

    try {

      const professor =
        await this.professorService.createProfessor(
          professorDTO
        );

      res.status(201).json(professor);

    } catch (error) {

      HandleError.error(error, res);
    }
  };

  // UPDATE
  updateProfessor = async (
    req: Request,
    res: Response
  ): Promise<void> => {

    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      res.status(400).json({
        error: "El ID debe ser un entero positivo"
      });
      return;
    }

    const [error, professorDTO] =
      UpdateProfessorDTO.create(req.body ?? {});

    if (error || !professorDTO) {
      res.status(400).json({ error });
      return;
    }

    try {

      const professor =
        await this.professorService.updateProfessor(
          id,
          professorDTO
        );

      res.status(200).json(professor);

    } catch (error) {

      HandleError.error(error, res);
    }
  };

  // DELETE
  deleteProfessor = async (
    req: Request,
    res: Response
  ): Promise<void> => {

    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      res.status(400).json({
        error: "El ID debe ser un entero positivo"
      });
      return;
    }

    try {

      await this.professorService.deleteProfessor(id);

      res.status(200).json({
        message: "Profesor eliminado correctamente"
      });

    } catch (error) {

      HandleError.error(error, res);
    }
  };
}
