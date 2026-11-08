
export class CreateProfessorDTO {

  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly specialty: string,
    public readonly status: boolean
  ) {}

  static create(
    object: Record<string, unknown>
  ): [string | undefined, CreateProfessorDTO?] {

    const { name, email, specialty, status } = object;

    if (typeof name !== "string" || !name.trim()) {
      return ["El nombre es obligatorio"];
    }

    if (name.trim().length > 100) {
      return ["El nombre supera los 100 caracteres"];
    }

    if (
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return ["El correo electrónico no es válido"];
    }

    if (email.length > 150) {
      return ["El correo supera los 150 caracteres"];
    }

    if (
      typeof specialty !== "string" ||
      !specialty.trim() ||
      specialty.trim().length > 100
    ) {
      return ["La especialidad no es válida"];
    }

    if (typeof status !== "boolean") {
      return ["El estado debe ser true o false"];
    }

    return [
      undefined,
      new CreateProfessorDTO(
        name.trim(),
        email.trim(),
        specialty.trim(),
        status
      )
    ];
  }
}
