import { Router } from 'express';
import type { Response } from 'express';

export const eventsRouter = Router();

const clients = new Set<Response>();

eventsRouter.get('/', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  res.flushHeaders();
  res.write(': connected\n\n');

  clients.add(res);
  req.on('close', () => {
    clients.delete(res);
  });
});

export function broadcast(payload: { collection?: string; key?: string }) {
  const data = `data: ${JSON.stringify(payload)}\n\n`;
  for (const client of clients) {
    client.write(data);
  }
}
