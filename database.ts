export type UserRole = 'admin' | 'tutor' | 'student';

export interface DatabaseUser {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface LessonRecord {
  id: string;
  studentId: string;
  tutorId: string;
  subject: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  scheduledAt: string;
  durationMinutes: number;
  hourlyRate: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatRoomRecord {
  id: string;
  matchId?: string;
  studentId: string;
  tutorId: string;
  lastMessage?: string;
  lastMessageAt?: string;
  createdAt: string;
}

export interface ChatMessageRecord {
  id: string;
  roomId: string;
  senderId: string;
  content: string;
  createdAt: string;
}
