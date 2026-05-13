import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export class TurmaController {
  // Rota para CRIAR um responsável (POST)
  async store(req: Request, res: Response) {
    try {
      const { nome, anoLetivo, escolaId} = req.body;

      // Validação básica: verifica se os campos obrigatórios vieram
      if (!anoLetivo || !escolaId ) {
        return res.status(400).json({ error: 'Ano letivo e Escola ID são obrigatórios.' });
      }

      const Turma = await prisma.turma.create({
        data: {
          nome,
          anoLetivo,
          escolaId,
        },
      });

      return res.status(201).json(Turma);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao cadastrar turma.' });
    }
  }

  // Rota para LISTAR responsáveis (GET)
  async index(req: Request, res: Response) {
    try {
      const turmas = await prisma.turma.findMany();
      return res.json(turmas);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar turmas.' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params; // Pega o ID da URL

      await prisma.turma.delete({
        where: { id: Number(id) } // Manda o Prisma apagar no banco
      });

      return res.status(204).send(); // Responde que deu certo e está vazio

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar turmas.' });
    }
}

  async update(req: Request, res: Response) {
  try {
    const { id } = req.params; // Pega o ID que vem na URL (ex: /responsaveis/1)
    const dadosParaAtualizar = req.body; // Pega os campos enviados (ex: { alergias: "Glúten" })

    const turmaAtualizada = await prisma.turma.update({
      where: { id: Number(id) }, // Localiza o responsável pelo ID
      data: {
        ...dadosParaAtualizar,
      },
    });

    return res.json(turmaAtualizada); // Retorna o responsável já com as alterações
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar dados da turma.' });
  }
}

}
