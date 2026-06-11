import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

function parseBoolean(value: unknown) {
  if (typeof value === 'boolean') return value;
  if (value === 'sim') return true;
  if (value === 'nao') return false;
  return Boolean(value);
}

function normalizeDiarioPayload(body: any, partial = false) {
  const {
    data,
    chegadaHumor,
    humor,
    alimentacao,
    banho,
    sono,
    sonecaInicio,
    sonecaFim,
    desenvolvimentoPedagogico,
    observacoes,
    observacoesFinais,
    atividades,
    fralda,
    fraldaTrocada,
    quantidadeFraldas,
    presenca,
    frequencia,
    bebeId,
    adiId,
  } = body;

  const estaPresente =
    typeof frequencia === 'boolean' ? frequencia : presenca !== 'ausente';

  const sonoFormatado =
    sono ||
    (sonecaInicio || sonecaFim
      ? `${sonecaInicio || '--:--'} - ${sonecaFim || '--:--'}`
      : undefined);

  const fraldaFormatada =
    fralda ||
    (typeof fraldaTrocada === 'boolean'
      ? fraldaTrocada
        ? `Trocou ${Number(quantidadeFraldas || 0)}x`
        : 'Não trocou'
      : undefined);

  const dataToSave: any = {};

  if (data) dataToSave.data = new Date(data);
  if (!partial || frequencia !== undefined || presenca !== undefined) {
    dataToSave.frequencia = estaPresente;
  }
  if (!partial || chegadaHumor !== undefined || humor !== undefined) {
    dataToSave.chegadaHumor = chegadaHumor || humor || null;
  }
  if (!partial || alimentacao !== undefined) dataToSave.alimentacao = alimentacao || null;
  if (!partial || banho !== undefined) dataToSave.banho = parseBoolean(banho);
  if (!partial || sono !== undefined || sonecaInicio !== undefined || sonecaFim !== undefined) {
    dataToSave.sono = sonoFormatado || null;
  }
  if (!partial || desenvolvimentoPedagogico !== undefined) {
    dataToSave.desenvolvimentoPedagogico =
      desenvolvimentoPedagogico === undefined || desenvolvimentoPedagogico === null
        ? null
        : String(desenvolvimentoPedagogico);
  }
  if (!partial || observacoesFinais !== undefined || observacoes !== undefined) {
    dataToSave.observacoesFinais = observacoesFinais || observacoes || null;
  }
  if (!partial || atividades !== undefined) {
    dataToSave.atividades = Array.isArray(atividades)
      ? JSON.stringify(atividades)
      : atividades || null;
  }
  if (!partial || fralda !== undefined || fraldaTrocada !== undefined) {
    dataToSave.fralda = fraldaFormatada || null;
  }
  if (bebeId) dataToSave.bebeId = Number(bebeId);
  if (adiId) dataToSave.adiId = Number(adiId);

  return dataToSave;
}

export class DiarioController {
  async storePresence(req: Request, res: Response) {
    try {
      const { bebeId, adiId, frequencia, presenca, data } = req.body;

      if (!bebeId || !adiId) {
        return res.status(400).json({ error: 'BebÃª e ADI sÃ£o obrigatÃ³rios.' });
      }

      const inicioDia = data ? new Date(data) : new Date();
      inicioDia.setHours(0, 0, 0, 0);

      const fimDia = new Date(inicioDia);
      fimDia.setDate(fimDia.getDate() + 1);

      const estaPresente =
        typeof frequencia === 'boolean' ? frequencia : presenca !== 'ausente';

      const diarioExistente = await prisma.diarioIndividual.findFirst({
        where: {
          bebeId: Number(bebeId),
          data: {
            gte: inicioDia,
            lt: fimDia,
          },
        },
      });

      if (diarioExistente) {
        const diarioAtualizado = await prisma.diarioIndividual.update({
          where: { id: diarioExistente.id },
          data: {
            frequencia: estaPresente,
            adiId: Number(adiId),
          },
        });

        return res.json(diarioAtualizado);
      }

      const diario = await prisma.diarioIndividual.create({
        data: {
          data: inicioDia,
          frequencia: estaPresente,
          bebeId: Number(bebeId),
          adiId: Number(adiId),
        },
      });

      return res.status(201).json(diario);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao registrar presenÃ§a.' });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { bebeId, adiId } = req.body;
      const diarioData = normalizeDiarioPayload(req.body);

      if (!bebeId || !adiId) {
        return res.status(400).json({ error: 'Bebê e ADI são obrigatórios.' });
      }

      if (diarioData.frequencia && !diarioData.desenvolvimentoPedagogico && !diarioData.chegadaHumor) {
        return res.status(400).json({
          error: 'É obrigatório informar o desenvolvimento pedagógico e o humor.',
        });
      }

      const diario = await prisma.diarioIndividual.create({
        data: {
          data: new Date(),
          ...diarioData,
        },
      });

      return res.status(201).json(diario);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao cadastrar diário.' });
    }
  }

  async index(req: Request, res: Response) {
    try {
      const diarios = await prisma.diarioIndividual.findMany();
      return res.json(diarios);
    } catch {
      return res.status(500).json({ error: 'Erro ao buscar diários.' });
    }
  }

  async byBebe(req: Request, res: Response) {
    try {
      const { bebeId } = req.params;
      const { data } = req.query;

      const where: any = {
        bebeId: Number(bebeId),
      };

      if (typeof data === 'string') {
        const inicioDia = new Date(data);
        inicioDia.setHours(0, 0, 0, 0);

        const fimDia = new Date(inicioDia);
        fimDia.setDate(fimDia.getDate() + 1);

        where.data = {
          gte: inicioDia,
          lt: fimDia,
        };
      }

      const diarios = await prisma.diarioIndividual.findMany({
        where,
        orderBy: {
          data: 'desc',
        },
      });

      return res.json(diarios);
    } catch {
      return res.status(500).json({ error: 'Erro ao buscar diÃ¡rios do bebÃª.' });
    }
  }

  async diary(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const diario = await prisma.diarioIndividual.findUnique({
        where: { id: Number(id) },
      });

      if (!diario) {
        return res.status(404).json({ error: 'Diário não encontrado.' });
      }

      return res.json(diario);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar diário.' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.diarioIndividual.delete({
        where: { id: Number(id) },
      });

      return res.status(204).send();
    } catch {
      return res.status(500).json({ error: 'Erro ao apagar diário.' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const diarioData = normalizeDiarioPayload(req.body, true);

      const diarioAtualizado = await prisma.diarioIndividual.update({
        where: { id: Number(id) },
        data: diarioData,
      });

      return res.json(diarioAtualizado);
    } catch {
      return res.status(500).json({ error: 'Erro ao atualizar dados do diário.' });
    }
  }
}
