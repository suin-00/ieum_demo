export type TutorGender = "male" | "female";
export type TutorStyle =
  | "課外活動・インターン・キャリア"
  | "サークル活動"
  | "大学文化・学園祭"
  | "学業・勉強"
  | "韓国生活・遊び";

export interface TutorProfile {
  email: string | null;
  nickname: string | null;
  first_name: string | null;
  last_name: string | null;
  furigana: string | null;
  gender: TutorGender | null;
  birth_date: string | null;
  created_at: string | null;
}

export interface Tutor {
  id: string;
  school: string | null;
  major: string | null;
  style: TutorStyle[] | null;
  mbti: string | null;
  bio: string | null;
  profiles: TutorProfile | null;
}

export interface CreateTutorInput {
  email: string;
  first_name: string;
  last_name: string;
  nickname?: string | null;
  furigana: string;
  gender: TutorGender;
  birth_date: string;
  school: string;
  major: string;
  style: TutorStyle[];
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
