import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export class AdiController {
  // Rota para CRIAR um bebê (POST)
  async store(req: Request, res: Response) {
    try {
      const { nome, matricula, email, telefone, senhaHash, escolaId } = req.body;

      // Validação básica: verifica se os campos obrigatórios vieram
      if (!nome || !matricula || !email) {
        return res.status(400).json({ error: 'Nome, matricula e email são obrigatórios.' });
      }

      const adi = await prisma.adi.create({
        data: {
          nome,
          matricula,
          email,
          telefone,
          senhaHash,
          escolaId,
        },
      });

      return res.status(201).json(adi);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao cadastrar adi.' });
    }
  }

  // Rota para LISTAR adi's (GET)
  async index(req: Request, res: Response) {
    try {
      const adis = await prisma.adi.findMany();
      return res.json(adis);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar adis.' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params; // Pega o ID da URL

      await prisma.adi.delete({
        where: { id: Number(id) } // Manda o Prisma apagar no banco
      });

      return res.status(204).send(); // Responde que deu certo e está vazio

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar adis.' });
    }
}

  async update(req: Request, res: Response) {
  try {
    const { id } = req.params; // Pega o ID que vem na URL (ex: /bebes/1)
    const dadosParaAtualizar = req.body; // Pega os campos enviados (ex: { alergias: "Glúten" })

    const adiAtualizada = await prisma.adi.update({
      where: { id: Number(id) }, // Localiza o bebê pelo ID
      data: {
        ...dadosParaAtualizar,
      },
    });

    return res.json(adiAtualizada); // Retorna o adi já com as alterações
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar dados da adi.' });
  }
}

}
