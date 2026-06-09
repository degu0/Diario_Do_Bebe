import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export class VinculoController {

  async vincularFilho(req: Request, res: Response) {
  try {
    // Pega os IDs direto da URL conforme o desenho da sua rota
    const { responsavelId, bebeId } = req.params;
    const { parentesco } = req.body; // Deixa no Body apenas o texto do parentesco

    if (!parentesco) {
      return res.status(400).json({ error: 'O grau de parentesco é obrigatório.' });
    }

    const vinculo = await prisma.vinculoFamiliar.create({
      data: {
        responsavelId: Number(responsavelId),
        bebeId: Number(bebeId),
        parentesco: parentesco
      }
    });

    return res.status(201).json(vinculo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao vincular responsável ao bebê.' });
  }
}

}
