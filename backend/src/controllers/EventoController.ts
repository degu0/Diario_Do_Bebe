import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export class EventoController {
  // Rota para CRIAR um escola (POST)
  async store(req: Request, res: Response) {
    try {
      const { titulo, descricao, dataEvento, horario_inicio, horario_fim, escolaId, turmaId } = req.body;

      // Validação básica: verifica se os campos obrigatórios vieram
      if (!titulo || !dataEvento ) {
        return res.status(400).json({ error: 'É obrigatório informar o nome e a data!' });
      }

      const evento2 = await prisma.evento.create({
        data: {
          titulo,
          descricao,
          dataEvento,
          horario_inicio,
          horario_fim,
          escolaId,
          turmaId

        },
      });

      return res.status(201).json(evento2);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao cadastrar evento.' });
    }
  }

  // Rota para LISTAR diários (GET)
  async index(req: Request, res: Response) {
    try {
      const eventos = await prisma.evento.findMany();
      return res.json(eventos);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar eventos.' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params; // Pega o ID da URL

      await prisma.evento.delete({
        where: { id: Number(id) } // Manda o Prisma apagar no banco
      });

      return res.status(204).send(); // Responde que deu certo e está vazio

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar eventos.' });
    }
}

  async update(req: Request, res: Response) {
  try {
    const { id } = req.params; // Pega o ID que vem na URL (ex: /diarios/1)
    const dadosParaAtualizar = req.body; // Pega os campos enviados (ex: { alergias: "Glúten" })

    const eventoAtualizado = await prisma.evento.update({
      where: { id: Number(id) }, // Localiza o diário pelo ID
      data: {
        ...dadosParaAtualizar,
      },
    });

    return res.json(eventoAtualizado); // Retorna a escola já com as alterações
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar dados da evento.' });
  }
}

}
