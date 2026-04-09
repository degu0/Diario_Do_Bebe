import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export class BebeController {
  // Rota para CRIAR um bebê (POST)
  async store(req: Request, res: Response) {
    try {
      const { nome, dataNascimento, genero, alergias, turmaId } = req.body;

      // Validação básica: verifica se os campos obrigatórios vieram
      if (!nome || !dataNascimento || !turmaId) {
        return res.status(400).json({ error: 'Nome, data de nascimento e turma são obrigatórios.' });
      }

      const bebe = await prisma.bebe.create({
        data: {
          nome,
          dataNascimento: new Date(dataNascimento), // Converte string "2024-10-10" para objeto Date
          genero,
          alergias,
          turmaId: Number(turmaId), // Garante que é um número
        },
      });

      return res.status(201).json(bebe);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao cadastrar bebê.' });
    }
  }

  // Rota para LISTAR bebês (GET)
  async index(req: Request, res: Response) {
    try {
      const bebes = await prisma.bebe.findMany({
        include: { turma: true } // Traz os dados da turma junto
      });
      return res.json(bebes);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar bebês.' });
    }
  }
}