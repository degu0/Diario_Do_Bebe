import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export class BebeController {
  // Rota para CRIAR um bebê (POST)
  async store(req: Request, res: Response) {
    try {
      const { nome, dataNascimento, genero, alergias, turmaId, escolaId } = req.body;

      // Validação básica: verifica se os campos obrigatórios vieram
      if (!nome || !dataNascimento || !turmaId || !escolaId) {
        return res.status(400).json({ error: 'Nome, data de nascimento e turma são obrigatórios.' });
      }

      const bebe = await prisma.bebe.create({
        data: {
          nome,
          dataNascimento: new Date(dataNascimento), // Converte string "2024-10-10" para objeto Date
          genero,
          alergias,
          turmaId: Number(turmaId), // Garante que é um número
          escolaId: Number(escolaId)
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

  // Rota para LISTAR bebês (GET)
  async class(req: Request, res: Response) {
    try {
      const { TURMAid } = req.params; // Pega o ID que vem na URL (ex: /bebes/1)
      const bebes = await prisma.bebe.findMany({
        where: { turmaId: Number(TURMAid)} // Traz os dados da turma junto
      });
      return res.json(bebes);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar bebês.' });
    }
  }

  // Rota para LISTAR bebês (GET)
  async profile(req: Request, res: Response) {
    try {
      const { BEBEid } = req.params; // Pega o ID que vem na URL (ex: /bebes/1)
      const bebeME = await prisma.bebe.findUnique({
        where: { id: Number(BEBEid)}, // Traz os dados da turma junto
        include: {
          escola: true,
          turma: true,
          responsaveis: {
            include: {
              responsavel: true // Traz os dados puros do responsável (nome, telefone)
            }
          }
        }
      });
      return res.json(bebeME);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar bebês.' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params; // Pega o ID da URL

      await prisma.bebe.delete({
        where: { id: Number(id) } // Manda o Prisma apagar no banco
      });

      return res.status(204).send(); // Responde que deu certo e está vazio

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar bebês.' });
    }
}

  async update(req: Request, res: Response) {
  try {
    const { id } = req.params; // Pega o ID que vem na URL (ex: /bebes/1)
    const dadosParaAtualizar = req.body; // Pega os campos enviados (ex: { alergias: "Glúten" })

    const bebeAtualizado = await prisma.bebe.update({
      where: { id: Number(id) }, // Localiza o bebê pelo ID
      data: {
        ...dadosParaAtualizar,
        // Se a data de nascimento vier, precisamos garantir que vire um objeto Date
        ...(dadosParaAtualizar.dataNascimento && {
          dataNascimento: new Date(dadosParaAtualizar.dataNascimento)
        }),
      },
    });

    return res.json(bebeAtualizado); // Retorna o bebê já com as alterações
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar dados do bebê.' });
  }
}

}
