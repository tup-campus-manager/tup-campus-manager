// src/services/api.service.ts
const API_URL = 'https://tu-api.com/items'; // reemplazá con tu API

export interface Item {
  id: number;
  name: string;
}

export async function fetchItemsFromApi(): Promise<Item[]> {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener items de la API');
  return response.json();
}
