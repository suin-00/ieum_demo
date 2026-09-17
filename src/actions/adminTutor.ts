'use server';

export async function verifyTutor(tutorId: string, isVerified: boolean) {
  try {
    return {
      success: true,
      tutorId,
      isVerified,
      updatedAt: new Date().toISOString(),
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: errorMsg };
  }
}

export async function updateTutorRate(tutorId: string, hourlyRate: number) {
  try {
    return {
      success: true,
      tutorId,
      hourlyRate,
      updatedAt: new Date().toISOString(),
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: errorMsg };
  }
}

export async function getAdminTutors() {
  return [
    {
      id: 'tut-1',
      name: 'Dr. Sarah Lin',
      email: 'sarah.lin@example.com',
      subjects: ['Calculus', 'Linear Algebra'],
      isVerified: true,
      hourlyRate: 65,
      rating: 4.95,
      totalStudents: 18,
    },
    {
      id: 'tut-2',
      name: 'Michael Chang',
      email: 'm.chang@example.com',
      subjects: ['Physics', 'Python'],
      isVerified: true,
      hourlyRate: 55,
      rating: 4.9,
      totalStudents: 14,
    },
  ];
}
