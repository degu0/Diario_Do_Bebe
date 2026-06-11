import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

type UserType = 'responsible' | 'teacher';

const JWT_SECRET = process.env.JWT_SECRET || 'diario-bebe-dev-secret';
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '7d') as jwt.SignOptions['expiresIn'];

function signToken(payload: { id: number; email: string; type: UserType }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

async function passwordMatches(password: string, senhaHash: string) {
  if (!senhaHash) return false;

  const looksHashed = senhaHash.startsWith('$2a$') || senhaHash.startsWith('$2b$');
  if (!looksHashed) return password === senhaHash;

  return bcrypt.compare(password, senhaHash);
}

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, senha, password, type } = req.body;
      const loginPassword = senha || password;

      if (!email || !loginPassword) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
      }

      const userType: UserType | undefined =
        type === 'responsible' || type === 'teacher' ? type : undefined;

      const responsavel =
        userType !== 'teacher'
          ? await prisma.responsavel.findUnique({ where: { email } })
          : null;

      if (responsavel && (await passwordMatches(loginPassword, responsavel.senhaHash))) {
        const token = signToken({
          id: responsavel.id,
          email: responsavel.email,
          type: 'responsible',
        });

        return res.json({
          token,
          user: {
            id: responsavel.id,
            nome: responsavel.nome,
            email: responsavel.email,
            type: 'responsible',
          },
        });
      }

      const adi =
        userType !== 'responsible' ? await prisma.adi.findUnique({ where: { email } }) : null;

      if (adi && (await passwordMatches(loginPassword, adi.senhaHash))) {
        const token = signToken({ id: adi.id, email: adi.email, type: 'teacher' });

        return res.json({
          token,
          user: {
            id: adi.id,
            nome: adi.nome,
            email: adi.email,
            type: 'teacher',
            escolaId: adi.escolaId,
          },
        });
      }

      return res.status(401).json({ error: 'Credenciais inválidas.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao realizar login.' });
    }
  }

  async me(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Token inválido.' });
      }

      if (req.user.type === 'responsible') {
        const responsavel = await prisma.responsavel.findUnique({
          where: { id: req.user.id },
          include: {
            bebes: {
              include: {
                bebe: true,
              },
            },
          },
        });

        if (!responsavel) {
          return res.status(404).json({ error: 'Responsável não encontrado.' });
        }

        return res.json({
          id: responsavel.id,
          nome: responsavel.nome,
          email: responsavel.email,
          type: 'responsible',
          bebes: responsavel.bebes,
        });
      }

      const adi = await prisma.adi.findUnique({
        where: { id: req.user.id },
        include: {
          escola: true,
          turmas: true,
        },
      });

      if (!adi) {
        return res.status(404).json({ error: 'ADI não encontrada.' });
      }

      return res.json({
        id: adi.id,
        nome: adi.nome,
        email: adi.email,
        type: 'teacher',
        escolaId: adi.escolaId,
        escola: adi.escola,
        turmas: adi.turmas,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar usuário autenticado.' });
    }
  }
}
