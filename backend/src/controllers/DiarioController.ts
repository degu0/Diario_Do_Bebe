import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export class DiarioController {
  // Rota para CRIAR um diário (POST)
  async store(req: Request, res: Response) {
    try {
      const { data, chegadaHumor, alimentacao, banho, sono, desenvolvimentoPedagogico, bebeId, adiId } = req.body;

      // Validação básica: verifica se os campos obrigatórios vieram
      if (!desenvolvimentoPedagogico || !chegadaHumor ) {
        return res.status(400).json({ error: 'É obrigatório informar o desenvolvimento pedagógico e o humor' });
      }

      const diario = await prisma.diarioIndividual.create({
        data: {
          chegadaHumor,
          data: new Date(data), // Converte string "2024-10-10" para objeto Date
          alimentacao,
          banho,
          sono,
          desenvolvimentoPedagogico,
          bebeId,
          adiId,
        },
      });

      return res.status(201).json(diario);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao cadastrar diário.' });
    }
  }

  // Rota para LISTAR diários (GET)
  async index(req: Request, res: Response) {
    try {
      const diarios = await prisma.diarioIndividual.findMany();
      return res.json(diarios);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar diários.' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params; // Pega o ID da URL

      await prisma.diarioIndividual.delete({
        where: { id: Number(id) } // Manda o Prisma apagar no banco
      });

      return res.status(204).send(); // Responde que deu certo e está vazio

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar diários.' });
    }
}

  async update(req: Request, res: Response) {
  try {
    const { id } = req.params; // Pega o ID que vem na URL (ex: /diarios/1)
    const dadosParaAtualizar = req.body; // Pega os campos enviados (ex: { alergias: "Glúten" })

    const diarioAtualizado = await prisma.diarioIndividual.update({
      where: { id: Number(id) }, // Localiza o diário pelo ID
      data: {
        ...dadosParaAtualizar,
        // Se a data de nascimento vier, precisamos garantir que vire um objeto Date
        ...(dadosParaAtualizar.data && {
          data: new Date(dadosParaAtualizar.data)
        }),
      },
    });

    return res.json(diarioAtualizado); // Retorna o diário já com as alterações
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar dados do diário.' });
  }
}

}
