
import { CreateProfessorDTO } from "./create-professor.dto";

export class UpdateProfessorDTO {

  static create(
    object: Record<string, unknown>
  ): [string | undefined, CreateProfessorDTO?] {

    return CreateProfessorDTO.create(object);
  }
}
