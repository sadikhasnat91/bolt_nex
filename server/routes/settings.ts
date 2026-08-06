import { Router } from 'express';
import { db } from '../db.ts';
import { requireAdmin } from '../middleware/requireAdmin.ts';
import { getSettingsDef, type FieldDef } from '../../src/content/manifest.ts';
import { broadcast } from './events.ts';

export const settingsRouter = Router();

function sanitize(fields: FieldDef[], raw: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const field of fields) {
    const value = raw[field.key];
    switch (field.type) {
      case 'boolean':
        out[field.key] = Boolean(value);
        break;
      case 'number':
        out[field.key] = Number(value) || 0;
        break;
      case 'list':
        out[field.key] = Array.isArray(value) ? value.map((v) => String(v)) : [];
        break;
      default:
        out[field.key] = typeof value === 'string' ? value : '';
    }
  }
  return out;
}

settingsRouter.get('/:key', (req, res) => {
  const key = String(req.params.key);
  const def = getSettingsDef(key);
  if (!def) {
    res.status(404).json({ error: 'Unknown settings key' });
    return;
  }
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key) as unknown as { value: string } | undefined;
  res.json(row ? JSON.parse(row.value) : sanitize(def.fields, {}));
});

settingsRouter.put('/:key', requireAdmin, (req, res) => {
  const key = String(req.params.key);
  const def = getSettingsDef(key);
  if (!def) {
    res.status(404).json({ error: 'Unknown settings key' });
    return;
  }
  const data = sanitize(def.fields, (req.body as Record<string, unknown>) ?? {});
  const now = new Date().toISOString();
  db.prepare(
    'INSERT INTO settings (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at'
  ).run(key, JSON.stringify(data), now);
  broadcast({ key });
  res.json(data);
});
