export class CreateRoomDTO {
  private constructor(
    public readonly code: string,
    public readonly building: string,
    public readonly capacity: number,
    public readonly available: boolean
  ) {}

  static create(
    object: Record<string, unknown>
  ): [string | undefined, CreateRoomDTO?] {
    const { code, building, capacity, available } = object;

    if (
      typeof code !== "string" ||
      !code.trim() ||
      code.trim().length > 20
    ) {
      return ["El codigo del salon no es valido"];
    }

    if (
      typeof building !== "string" ||
      !building.trim() ||
      building.trim().length > 100
    ) {
      return ["El nombre del edificio no es valido"];
    }

    if (
      typeof capacity !== "number" ||
      !Number.isInteger(capacity) ||
      capacity < 1 ||
      capacity > 500
    ) {
      return ["La capacidad debe estar entre 1 y 500"];
    }

    if (typeof available !== "boolean") {
      return ["La disponibilidad debe ser true o false"];
    }

    return [
      undefined,
      new CreateRoomDTO(
        code.trim(),
        building.trim(),
        capacity,
        available
      )
    ];
  }
}