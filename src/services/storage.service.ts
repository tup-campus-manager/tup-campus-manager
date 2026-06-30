interface CacheData<T> {
  data: T;
  timestamp: number;
}

export function saveToStorage<T>(key: string, data: T): void {
  const payload: CacheData<T> = { data, timestamp: Date.now() };
  localStorage.setItem(key, JSON.stringify(payload));
}

export function getFromStorage<T>(key: string, ttl: number): T | null {
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  const { data, timestamp }: CacheData<T> = JSON.parse(raw);
  const isExpired = Date.now() - timestamp > ttl;

  if (isExpired) {
    localStorage.removeItem(key);
    return null;
  }

  return data;
}
