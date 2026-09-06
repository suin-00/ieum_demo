export type TutorGender = "male" | "female";

export interface TutorProfile {
  email: string | null;
  name: string | null;
  furigana: string | null;
  gender: TutorGender | null;
}

export interface Tutor {
  id: string;
  school: string | null;
  major: string | null;
  style: string | null;
  mbti: string | null;
  bio: string | null;
  profiles: TutorProfile | null;
}

export interface CreateTutorInput {
  email: string;
  name: string;
  furigana: string;
  gender: TutorGender;
  school: string;
  major: string;
  style: string;
  mbti: string;
  bio: string;
}

export type UpdateTutorInput = Omit<CreateTutorInput, "email">;

export type TutorEditFormValues = UpdateTutorInput;

export interface TutorTableProps {
  tutors: Tutor[];
}

export interface TutorActionResult {
  success: boolean;
  message: string;
}
