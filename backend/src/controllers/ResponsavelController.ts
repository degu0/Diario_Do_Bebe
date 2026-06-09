import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export class ResponsavelController {
  async store(req: Request, res: Response) {
    try {
      // Recebemos os dados do responsável E os dados para o vínculo opcional com um filho
      const { nome, cpf, telefone, email, senhaHash, endereco, bebeId, parentesco } = req.body;

      // Validação básica de campos obrigatórios do responsável
      if (!nome || !cpf || !email || !senhaHash) {
        return res.status(400).json({ error: 'Nome, CPF, Email e Senha são obrigatórios.' });
      }

      // Criamos o responsável usando o poder de escrita aninhada do Prisma
      const responsavel = await prisma.responsavel.create({
        data: {
          nome,
          cpf,
          telefone,
          email,
          senhaHash,
          endereco,
          // Se o front-end enviou um bebeId e um parentesco, criamos o vínculo na mesma tacada
          bebes: bebeId && parentesco ? {
            create: {
              bebeId: Number(bebeId),
              parentesco: parentesco // "Mãe", "Pai", "Avô", "Tio", etc.
            }
          } : undefined // Se não vier, ele apenas ignora e cria o responsável sem filhos por enquanto
        },
        // Esse include serve para o Postman já te devolver o responsável com a lista de filhos vinculados
        include: {
          bebes: {
            include: {
              bebe: true
            }
          }
        }
      });

      return res.status(201).json(responsavel);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao cadastrar responsável.' });
    }
  }

  async profile(req: Request, res: Response) {
  try {
    const { responsavelId } = req.params; // Ex: /responsavel/6/perfil

    const responsavelME = await prisma.responsavel.findUnique({
      where: { id: Number(responsavelId) },
      include: {
        bebes: {
          include: {
            bebe: true // 👈 A MÁGICA AQUI: Traz os dados reais do filho (id, nome, fotoUrl...)
          }
        }
      }
    });

    if (!responsavelME) {
      return res.status(404).json({ error: 'Responsável não encontrado.' });
    }

    return res.json(responsavelME);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar perfil do responsável.' });
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
