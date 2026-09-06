export interface Student {
  id: string;
  email: string | null;
  name: string | null;
  created_at: string | null;
  role: "student";
}

export interface CreateStudentInput {
  email: string;
  name: string;
}
