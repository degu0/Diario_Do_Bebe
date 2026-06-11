import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

type AuthUser = {
  id: number;
  email: string;
  type: 'responsible' | 'teacher';
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'diario-bebe-dev-secret';

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não informado.' });
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    return res.status(401).json({ error: 'Token inválido.' });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET) as AuthUser;
    return next();
  } catch {
    return res.status(401).json({ error: 'Token inválido.' });
  }
}
