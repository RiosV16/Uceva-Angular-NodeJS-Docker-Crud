import { Router } from "express";
import { StudentRoutes } from "./modules/student/student.routes";
import { CourseRoutes } from "./modules/course/course.route";
import { ProfessorRoutes } from "./modules/professor/professor.routes";
import { RoomRoutes } from "./modules/room/room.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    const apiRouter = Router();

    // Rutas hijas
    apiRouter.use("/students", StudentRoutes.routes);
    apiRouter.use("/courses", CourseRoutes.routes);
    apiRouter.use("/professors", ProfessorRoutes.routes);
    apiRouter.use("/rooms", RoomRoutes.routes);

    // Montar apiRouter bajo el prefijo /api
    router.use("/api", apiRouter);

    return router;
  }
}