import { Router } from 'express';
import { nanoid } from 'nanoid';
import { db } from '../db.ts';
import { requireAdmin } from '../middleware/requireAdmin.ts';
import { getCollectionDef, type FieldDef } from '../../src/content/manifest.ts';
import { broadcast } from './events.ts';

export const contentRouter = Router();

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

interface ItemRow {
  id: string;
  position: number;
  data: string;
  updated_at: string;
}

contentRouter.get('/:collection', (req, res) => {
  const collection = String(req.params.collection);
  const def = getCollectionDef(collection);
  if (!def) {
    res.status(404).json({ error: 'Unknown collection' });
    return;
  }
  const rows = db
    .prepare('SELECT id, position, data, updated_at FROM collection_items WHERE collection = ? ORDER BY position ASC')
    .all(collection) as unknown as ItemRow[];
  res.json(rows.map((r) => ({ id: r.id, ...JSON.parse(r.data) })));
});

contentRouter.post('/:collection', requireAdmin, (req, res) => {
  const collection = String(req.params.collection);
  const def = getCollectionDef(collection);
  if (!def) {
    res.status(404).json({ error: 'Unknown collection' });
    return;
  }
  const data = sanitize(def.fields, (req.body as Record<string, unknown>) ?? {});
  const id = nanoid();
  const now = new Date().toISOString();
  const maxPos = db
    .prepare('SELECT COALESCE(MAX(position), -1) as maxPos FROM collection_items WHERE collection = ?')
    .get(collection) as unknown as { maxPos: number };

  db.prepare('INSERT INTO collection_items (id, collection, position, data, updated_at) VALUES (?, ?, ?, ?, ?)').run(
    id,
    collection,
    (maxPos?.maxPos ?? -1) + 1,
    JSON.stringify(data),
    now
  );

  broadcast({ collection });
  res.status(201).json({ id, ...data });
});

contentRouter.put('/:collection/reorder', requireAdmin, (req, res) => {
  const collection = String(req.params.collection);
  const def = getCollectionDef(collection);
  if (!def) {
    res.status(404).json({ error: 'Unknown collection' });
    return;
  }
  const ids = req.body?.ids;
  if (!Array.isArray(ids)) {
    res.status(400).json({ error: 'ids must be an array' });
    return;
  }
  const update = db.prepare('UPDATE collection_items SET position = ? WHERE id = ? AND collection = ?');
  ids.forEach((id, i) => {
    update.run(i, String(id), collection);
  });
  broadcast({ collection });
  res.json({ ok: true });
});

contentRouter.put('/:collection/:id', requireAdmin, (req, res) => {
  const collection = String(req.params.collection);
  const id = String(req.params.id);
  const def = getCollectionDef(collection);
  if (!def) {
    res.status(404).json({ error: 'Unknown collection' });
    return;
  }
  const existing = db
    .prepare('SELECT id FROM collection_items WHERE id = ? AND collection = ?')
    .get(id, collection);
  if (!existing) {
    res.status(404).json({ error: 'Item not found' });
    return;
  }
  const data = sanitize(def.fields, (req.body as Record<string, unknown>) ?? {});
  const now = new Date().toISOString();
  db.prepare('UPDATE collection_items SET data = ?, updated_at = ? WHERE id = ? AND collection = ?').run(
    JSON.stringify(data),
    now,
    id,
    collection
  );
  broadcast({ collection });
  res.json({ id, ...data });
});

contentRouter.delete('/:collection/:id', requireAdmin, (req, res) => {
  const collection = String(req.params.collection);
  const id = String(req.params.id);
  const def = getCollectionDef(collection);
  if (!def) {
    res.status(404).json({ error: 'Unknown collection' });
    return;
  }
  db.prepare('DELETE FROM collection_items WHERE id = ? AND collection = ?').run(id, collection);
  broadcast({ collection });
  res.json({ ok: true });
});
