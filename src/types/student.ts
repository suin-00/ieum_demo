export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  gradeLevel: string;
  targetSubjects: string[];
  learningGoals: string;
  preferredSchedule: string[];
  budgetPerHour: number;
  matchedTutorId?: string;
  createdAt: string;
}

export interface StudentProfileUpdateInput {
  name?: string;
  gradeLevel?: string;
  targetSubjects?: string[];
  learningGoals?: string;
  preferredSchedule?: string[];
  budgetPerHour?: number;
}
