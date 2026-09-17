'use server';

export async function updateStudentStatus(studentId: string, status: 'active' | 'suspended' | 'archived') {
  try {
    return {
      success: true,
      studentId,
      status,
      updatedAt: new Date().toISOString(),
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: errorMsg };
  }
}

export async function assignTutorToStudent(studentId: string, tutorId: string) {
  try {
    return {
      success: true,
      studentId,
      tutorId,
      assignedAt: new Date().toISOString(),
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: errorMsg };
  }
}

export async function getAdminStudents() {
  return [
    {
      id: 'stu-1',
      name: 'Alex Rivera',
      email: 'alex.rivera@example.com',
      gradeLevel: 'Grade 11',
      activeLessons: 3,
      status: 'active',
      joinedAt: '2026-08-10',
    },
    {
      id: 'stu-2',
      name: 'Maya Patel',
      email: 'maya.patel@example.com',
      gradeLevel: 'Grade 12',
      activeLessons: 5,
      status: 'active',
      joinedAt: '2026-07-22',
    },
  ];
}
