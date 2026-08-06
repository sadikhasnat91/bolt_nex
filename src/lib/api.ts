const JSON_HEADERS = { 'Content-Type': 'application/json' };

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(body.error ?? 'Request failed');
  }
  return res.json() as Promise<T>;
}

export function getContent<T>(collection: string): Promise<(T & { id: string })[]> {
  return fetch(`/api/content/${collection}`, { credentials: 'include' }).then((res) => handle(res));
}

export function createContentItem<T extends Record<string, unknown>>(
  collection: string,
  data: T
): Promise<T & { id: string }> {
  return fetch(`/api/content/${collection}`, {
    method: 'POST',
    credentials: 'include',
    headers: JSON_HEADERS,
    body: JSON.stringify(data),
  }).then((res) => handle(res));
}

export function updateContentItem<T extends Record<string, unknown>>(
  collection: string,
  id: string,
  data: T
): Promise<T & { id: string }> {
  return fetch(`/api/content/${collection}/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: JSON_HEADERS,
    body: JSON.stringify(data),
  }).then((res) => handle(res));
}

export function deleteContentItem(collection: string, id: string): Promise<{ ok: true }> {
  return fetch(`/api/content/${collection}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  }).then((res) => handle(res));
}

export function reorderContent(collection: string, ids: string[]): Promise<{ ok: true }> {
  return fetch(`/api/content/${collection}/reorder`, {
    method: 'PUT',
    credentials: 'include',
    headers: JSON_HEADERS,
    body: JSON.stringify({ ids }),
  }).then((res) => handle(res));
}

export function getSettings<T>(key: string): Promise<T> {
  return fetch(`/api/settings/${key}`, { credentials: 'include' }).then((res) => handle(res));
}

export function updateSettings<T extends Record<string, unknown>>(key: string, data: T): Promise<T> {
  return fetch(`/api/settings/${key}`, {
    method: 'PUT',
    credentials: 'include',
    headers: JSON_HEADERS,
    body: JSON.stringify(data),
  }).then((res) => handle(res));
}

export function login(username: string, password: string): Promise<{ username: string }> {
  return fetch('/api/auth/login', {
    method: 'POST',
    credentials: 'include',
    headers: JSON_HEADERS,
    body: JSON.stringify({ username, password }),
  }).then((res) => handle(res));
}

export function logout(): Promise<{ ok: true }> {
  return fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }).then((res) => handle(res));
}

export function me(): Promise<{ username: string }> {
  return fetch('/api/auth/me', { credentials: 'include' }).then((res) => handle(res));
}

export function uploadImage(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('file', file);
  return fetch('/api/upload', {
    method: 'POST',
    credentials: 'include',
    body: formData,
  }).then((res) => handle(res));
}
