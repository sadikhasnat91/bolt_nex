import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import { seed } from './seed.ts';
import { authRouter } from './routes/auth.ts';
import { contentRouter } from './routes/content.ts';
import { settingsRouter } from './routes/settings.ts';
import { uploadRouter } from './routes/upload.ts';
import { eventsRouter } from './routes/events.ts';

seed();

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use('/uploads', express.static(path.join(import.meta.dirname, 'uploads')));

  app.use('/api/auth', authRouter);
  app.use('/api/content', contentRouter);
  app.use('/api/settings', settingsRouter);
  app.use('/api/upload', uploadRouter);
  app.use('/api/events', eventsRouter);

  // Return JSON for unmatched API routes (Express 5 regex syntax)
  app.all(/^\/api\/.*/, (_req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
  });

  // Pass non-API requests through to Vite
  app.use((_req, _res, next) => {
    next();
  });

  app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    res.status(400).json({ error: err.message || 'Unexpected error' });
  });

  return app;
}
