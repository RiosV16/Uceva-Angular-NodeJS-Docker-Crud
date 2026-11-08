
import { Router } from "express";

import { ProfessorController } from "./professor.controller";

export class ProfessorRoutes {

  static get routes(): Router {

    const router = Router();

    const controller = new ProfessorController();

    // Consultar todos los profesores
    router.get(
      "/",
      controller.getAllProfessors
    );

    // Consultar profesor por ID
    router.get(
      "/:id",
      controller.getProfessorById
    );

    // Registrar profesor
    router.post(
      "/",
      controller.createProfessor
    );

    // Actualizar profesor
    router.put(
      "/:id",
      controller.updateProfessor
    );

    // Eliminar profesor
    router.delete(
      "/:id",
      controller.deleteProfessor
    );

    return router;
  }
}
