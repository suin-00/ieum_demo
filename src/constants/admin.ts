export const ADMIN_CONFIG = {
  appName: 'Tutor & Student Platform',
  systemStatus: 'Operational',
  version: '1.0.0',
  defaultPageLimit: 20,
  roles: ['admin', 'tutor', 'student'] as const,
  adminNavLinks: [
    { label: 'Overview', href: '/admin' },
    { label: 'Students', href: '/admin/students' },
    { label: 'Tutors', href: '/admin/tutors' },
    { label: 'Lessons', href: '/admin/lessons' },
  ],
};

export const PLATFORM_METRICS = {
  activeStudents: 1420,
  verifiedTutors: 310,
  completedLessons: 8490,
  averageRating: 4.88,
};
