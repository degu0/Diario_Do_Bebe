import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export class DashboardController {

  async getDashboard(req: Request, res: Response) {
    try {
      const { ADIid, TURMAid } = req.params;

      const inicioHoje = new Date();
      inicioHoje.setHours(0,0,0,0);

      const [AdiLogada, diarios, totalAusentes, turmaAtual, listarAlunos, ocorrencias] = await Promise.all([

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

      prisma.ocorrencia.findMany({
        where: {
          dia: { gte: inicioHoje },
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
      ocorrencias,
      listaCrianças: diarios,
      turmaAtual,
      listarAlunos
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao gerar dashboard' });
  }
}

async getDashboardParents(req: Request, res: Response) {
  try {
    const { ParentID, BabyID } = req.params;
    const inicioHoje = new Date();
    inicioHoje.setHours(0, 0, 0, 0);

    const [ResponsavelLogado, diario, bebeSelecionado] = await Promise.all([
      // 1. Busca o Responsável e a lista de todos os seus filhos (para os ícones)
      prisma.responsavel.findUnique({
        where: { id: Number(ParentID) },
        include: {
          bebes: {
            include: {
              bebe: true
            }
          }
        }
      }),

      // 2. Busca o diário de hoje do bebê específico clicado
      prisma.diarioIndividual.findFirst({
        where: {
          bebeId: Number(BabyID),
          data: { gte: inicioHoje }
        }
      }),

      // 3. Busca detalhes do bebê selecionado (Escola e Turma para o cabeçalho)
      prisma.bebe.findUnique({
        where: { id: Number(BabyID) },
        include: { escola: true, turma: true }
      })
    ]);

    if (!ResponsavelLogado) return res.status(404).json({ error: 'Responsável não encontrado' });
    if (!bebeSelecionado) return res.status(404).json({ error: 'Bebê não encontrado' });

    return res.json({
      perfil: {
        nome: ResponsavelLogado.nome,
        // Agora pegamos a escola e turma do bebê que está selecionado na tela
        escola: bebeSelecionado.escola.nome,
        turma: bebeSelecionado.turma.nome,
        saudacao: `Boa tarde, ${ResponsavelLogado.nome.split(' ')[0]}`
      },
      filhos: ResponsavelLogado.bebes, // Para renderizar os ícones "MF", "ZS", etc.
      // Dados do diário que preenchem os cards de Alimentação e Sono na image_78ab53.png
      statusHoje: diario ? {
        presente: diario.frequencia,
        alimentacao: diario.alimentacao,
        sono: diario.sono
      } : { presente: false, mensagem: "Aguardando registro da creche" }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao gerar dashboard do responsável' });
  }
}

}
