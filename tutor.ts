export interface TutorProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio: string;
  subjects: string[];
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  yearsOfExperience: number;
  education: string;
  isVerified: boolean;
  availableDays: string[];
  createdAt: string;
}

export interface TutorFilterOptions {
  subject?: string;
  maxHourlyRate?: number;
  minRating?: number;
  dayAvailable?: string;
  query?: string;
}
