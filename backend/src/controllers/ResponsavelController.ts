import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export class ResponsavelController {
  // Rota para CRIAR um responsável (POST)
  async store(req: Request, res: Response) {
    try {
      const { nome, cpf, telefone, email, senhaHash, endereco, } = req.body;

      // Validação básica: verifica se os campos obrigatórios vieram
      if (!cpf || !email ) {
        return res.status(400).json({ error: 'Nome, data de nascimento e turma são obrigatórios.' });
      }

      const responsavel = await prisma.responsavel.create({
        data: {
          nome,
          cpf,
          telefone,
          email,
          senhaHash,
          endereco,
        },
      });

      return res.status(201).json(responsavel);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao cadastrar responsável.' });
    }
  }

  // Rota para LISTAR responsáveis (GET)
  async index(req: Request, res: Response) {
    try {
      const responsaveis = await prisma.responsavel.findMany();
      return res.json(responsaveis);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar responsáveis.' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params; // Pega o ID da URL

      await prisma.responsavel.delete({
        where: { id: Number(id) } // Manda o Prisma apagar no banco
      });

      return res.status(204).send(); // Responde que deu certo e está vazio

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar responsáveis.' });
    }
}

  async update(req: Request, res: Response) {
  try {
    const { id } = req.params; // Pega o ID que vem na URL (ex: /responsaveis/1)
    const dadosParaAtualizar = req.body; // Pega os campos enviados (ex: { alergias: "Glúten" })

    const responsavelAtualizado = await prisma.responsavel.update({
      where: { id: Number(id) }, // Localiza o responsável pelo ID
      data: {
        ...dadosParaAtualizar,
      },
    });

    return res.json(responsavelAtualizado); // Retorna o responsável já com as alterações
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar dados do responsável.' });
  }
}

}
