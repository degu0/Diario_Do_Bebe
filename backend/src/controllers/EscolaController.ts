import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export class EscolaController {
  // Rota para CRIAR um escola (POST)
  async store(req: Request, res: Response) {
    try {
      const { nome, endereco, telefone } = req.body;

      // Validação básica: verifica se os campos obrigatórios vieram
      if (!nome || !telefone ) {
        return res.status(400).json({ error: 'É obrigatório informar o nome e o telefone' });
      }

      const escola = await prisma.escola.create({
        data: {
          nome,
          endereco,
          telefone
        },
      });

      return res.status(201).json(escola);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao cadastrar escola.' });
    }
  }

  // Rota para LISTAR diários (GET)
  async index(req: Request, res: Response) {
    try {
      const escolas = await prisma.escola.findMany();
      return res.json(escolas);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar escolas.' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params; // Pega o ID da URL

      await prisma.escola.delete({
        where: { id: Number(id) } // Manda o Prisma apagar no banco
      });

      return res.status(204).send(); // Responde que deu certo e está vazio

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar escolas.' });
    }
}

  async update(req: Request, res: Response) {
  try {
    const { id } = req.params; // Pega o ID que vem na URL (ex: /diarios/1)
    const dadosParaAtualizar = req.body; // Pega os campos enviados (ex: { alergias: "Glúten" })

    const escolaAtualizada = await prisma.escola.update({
      where: { id: Number(id) }, // Localiza o diário pelo ID
      data: {
        ...dadosParaAtualizar,
      },
    });

    return res.json(escolaAtualizada); // Retorna a escola já com as alterações
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar dados da escola.' });
  }
}

}
