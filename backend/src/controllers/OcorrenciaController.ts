import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export class OcorrenciaController {
  // Rota para CRIAR um ocorrencia (POST)
  async store(req: Request, res: Response) {
    try {
      const { titulo, descricao, horario, prioridade, bebeId, adiId, } = req.body;

      // Validação básica: verifica se os campos obrigatórios vieram
      if (!titulo || !prioridade ) {
        return res.status(400).json({ error: 'Titulo e Prioridade são obrigatórios!.' });
      }

      const ocorrencia2 = await prisma.ocorrencia.create({
        data: {
          titulo,
          descricao,
          horario,
          prioridade,
          bebeId,
          adiId,
        },
      });

      return res.status(201).json(ocorrencia2);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao cadastrar ocorrencia.' });
    }
  }

  // Rota para LISTAR ocorrencias (GET)
  async index(req: Request, res: Response) {
    try {
      const ocorrencias = await prisma.ocorrencia.findMany();
      return res.json(ocorrencias);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar ocorrencias.' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params; // Pega o ID da URL

      await prisma.ocorrencia.delete({
        where: { id: Number(id) } // Manda o Prisma apagar no banco
      });

      return res.status(204).send(); // Responde que deu certo e está vazio

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar ocorrencias.' });
    }
}

  async update(req: Request, res: Response) {
  try {
    const { id } = req.params; // Pega o ID que vem na URL (ex: /responsaveis/1)
    const dadosParaAtualizar = req.body; // Pega os campos enviados (ex: { alergias: "Glúten" })

    const ocorrenciaAtualizada = await prisma.ocorrencia.update({
      where: { id: Number(id) }, // Localiza o ocorrencia pelo ID
      data: {
        ...dadosParaAtualizar,
      },
    });

    return res.json(ocorrenciaAtualizada); // Retorna o ocorrencia já com as alterações
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar dados da ocorrencia.' });
  }
}

}
