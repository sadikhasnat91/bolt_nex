import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';

const dataDir = path.join(import.meta.dirname, 'data');
fs.mkdirSync(dataDir, { recursive: true });

const db = new DatabaseSync(path.join(dataDir, 'app.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS collection_items (
    id TEXT PRIMARY KEY,
    collection TEXT NOT NULL,
    position INTEGER NOT NULL,
    data TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_collection_items_collection ON collection_items(collection);

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`);

export function isEmpty(): boolean {
  try {
    const row = db.prepare('SELECT COUNT(*) as count FROM collection_items').get() as Record<string, unknown>;
    if (!row) return true;
    const val = Number(Object.values(row)[0] ?? 0);
    return val === 0;
  } catch {
    return true;
  }
}

export { db };
