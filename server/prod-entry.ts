import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { createApp } from './app.ts';

const app = createApp();
const distDir = path.join(import.meta.dirname, '..', 'dist');

app.use(express.static(distDir));
app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
