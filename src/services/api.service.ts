export interface Student {
  name: { first: string; last: string };
  email: string;
  dob: { age: number };
  phone: string;
  location: { country: string; state: string; city: string };
  picture: { medium: string };
}

const API_URL = 'https://randomuser.me/api/?results=20';

export async function fetchStudentsFromApi(): Promise<Student[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al consultar la API');
  const json = await res.json();
  return json.results;
}
