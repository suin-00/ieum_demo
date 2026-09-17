'use server';

export async function updateLessonStatus(lessonId: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') {
  try {
    // Boilerplate action for updating lesson status in database
    return {
      success: true,
      lessonId,
      status,
      updatedAt: new Date().toISOString(),
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: errorMsg };
  }
}

export async function cancelLesson(lessonId: string, reason?: string) {
  try {
    return {
      success: true,
      lessonId,
      status: 'cancelled',
      reason: reason || 'Administrative cancellation',
      cancelledAt: new Date().toISOString(),
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: errorMsg };
  }
}

export async function getAdminLessons() {
  return [
    {
      id: 'les-1',
      studentName: 'Alex Rivera',
      tutorName: 'Dr. Sarah Lin',
      subject: 'AP Calculus BC',
      status: 'confirmed',
      scheduledAt: '2026-09-15T16:00:00Z',
      durationMinutes: 60,
      hourlyRate: 65,
    },
    {
      id: 'les-2',
      studentName: 'Maya Patel',
      tutorName: 'Michael Chang',
      subject: 'Physics Mechanics',
      status: 'completed',
      scheduledAt: '2026-09-12T14:00:00Z',
      durationMinutes: 90,
      hourlyRate: 55,
    },
  ];
}
