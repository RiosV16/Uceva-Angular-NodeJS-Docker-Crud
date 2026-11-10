
export interface Professor {
  id: number;
  name: string;
  email: string;
  specialty: string;
  status: boolean;
}

export type CreateProfessorRequest = Omit<Professor, 'id'>;

export type UpdateProfessorRequest = Omit<Professor, 'id'>;
