
export interface Professor {
  id: number;
  name: string;
  email: string;
  specialty: string;
  status: boolean;
}

export type CreateProfessor = Omit<Professor, "id">;
export type UpdateProfessor = Omit<Professor, "id">;
