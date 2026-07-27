import { fetchStudentsFromApi } from './api.service';
import type { Student } from './api.service';
import { getFromStorage, saveToStorage } from './storage.service';

const CACHE_KEY = 'students_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export async function getStudents(): Promise<Student[]> {
  const cached = getFromStorage<Student[]>(CACHE_KEY, CACHE_DURATION);
  if (cached) {
    console.log('Estudiantes desde caché local');
    return cached;
  }

  console.log('Estudiantes desde API');
  const students = await fetchStudentsFromApi();
  saveToStorage(CACHE_KEY, students);
  return students;
}

export type { Student };
