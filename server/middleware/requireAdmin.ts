import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const COOKIE_NAME = 'admin_token';

export interface AuthedRequest extends Request {
  admin?: { username: string };
}

export function requireAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }
  try {
    const secret = process.env.JWT_SECRET ?? 'dev-secret';
    const payload = jwt.verify(token, secret) as { username: string };
    req.admin = { username: payload.username };
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired session' });
  }
}
