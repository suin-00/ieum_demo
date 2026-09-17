'use client';

import { useState, useCallback } from 'react';
import type { TutorProfile } from '@/types/tutor';

export function useTutorSelection(initialTutors: TutorProfile[] = []) {
  const [selectedTutorId, setSelectedTutorId] = useState<string | null>(null);
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const selectTutor = useCallback((tutorId: string) => {
    setSelectedTutorId((prev) => (prev === tutorId ? null : tutorId));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedTutorId(null);
  }, []);

  const filteredTutors = initialTutors.filter((tutor) => {
    const matchesSubject = filterSubject === 'all' || tutor.subjects.includes(filterSubject);
    const matchesSearch =
      !searchTerm ||
      tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.subjects.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSubject && matchesSearch;
  });

  return {
    selectedTutorId,
    selectTutor,
    clearSelection,
    filterSubject,
    setFilterSubject,
    searchTerm,
    setSearchTerm,
    filteredTutors,
  };
}
