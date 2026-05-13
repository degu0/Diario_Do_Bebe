import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export class DashboardController {

  async getDashboard(req: Request, res: Response) {
    try {
      const { ADIid, TURMAid } = req.params;

      const inicioHoje = new Date();
      inicioHoje.setHours(0,0,0,0);

      const [AdiLogada, diarios, totalAusentes, turmaAtual, listarAlunos] = await Promise.all([

      prisma.adi.findUnique({
        where: {id: Number(ADIid)},
        include: {escola: true}
      }),

      prisma.diarioIndividual.findMany({
        where: {
          bebe: {turmaId: Number(TURMAid)},
          data: {gte: inicioHoje}
        },
      }),

      prisma.diarioIndividual.count({
        where: {
          bebe: { turmaId: Number(TURMAid) },
          data: { gte: inicioHoje },
          frequencia: false
        }
      }),

      prisma.turma.findMany({
        where: {
          id: Number(TURMAid),
        }
      }),

      prisma.bebe.findMany({
        where: {
          turmaId: Number(TURMAid),
        }
      }),

     ]);

     // Validação: Se a ADI não existir, paramos aqui
    if (!AdiLogada) return res.status(404).json({ error: 'Adi não encontrada' });

     return res.json({
      perfil: {
        nome: AdiLogada.nome,
        escola: AdiLogada.escola.nome,
        saudacao: `Boa tarde, ${AdiLogada.nome.split(' ')[0]}`
      },
      estatisticas: {
        preenchidos: diarios.length,
        ausentes: totalAusentes,
        totalTurma: 4 // No futuro, isso pode ser um prisma.bebe.count()
      },
      listaCrianças: diarios,
      turmaAtual,
      listarAlunos
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao gerar dashboard' });
  }
}

}
