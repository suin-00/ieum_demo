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
  profile_image: string | null;
  background_image: string[] | null;
  current_students: number | null;
  max_students: number | null;
}

export interface ProfileTutorJoined {
  id: string;
  nickname: string | null;
  furigana: string | null;
  first_name: string | null;
  last_name: string | null;
  birth_date: string | null;
  tutors: {
    school: string | null;
    major: string | null;
    style: string[] | string | null;
    interests: string[] | string | null;
    profile_image: string | null;
    background_image: string[] | string | null;
    bio: string | null;
  } | null;
}
export interface TutorSearchParams {
  university?: string;
  interests?: string;
  energy?: string;
  communication?: string;
  structure?: string;
  goal?: string;
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
  profile_image?: string | null;
  background_image?: string[] | null;
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
