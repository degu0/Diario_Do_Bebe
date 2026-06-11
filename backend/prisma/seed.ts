import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

// 1. Cria a conexão do driver de baixo nível
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// 2. Cria o adaptador do Prisma para esse driver
const adapter = new PrismaPg(pool);

// 3. Inicia o Prisma Client passando o adaptador
const prisma = new PrismaClient({ adapter });

function hojeAs(horas: number, minutos = 0) {
  const data = new Date();
  data.setHours(horas, minutos, 0, 0);
  return data;
}

function diasAPartirDeHoje(dias: number) {
  const data = new Date();
  data.setDate(data.getDate() + dias);
  data.setHours(0, 0, 0, 0);
  return data;
}

function diasAtrasAs(dias: number, horas: number, minutos = 0) {
  const data = new Date();
  data.setDate(data.getDate() - dias);
  data.setHours(horas, minutos, 0, 0);
  return data;
}

async function main() {
  console.log('🌱 Iniciando o seed...');

  // Limpa as tabelas na ordem das dependências para o seed ser re-executável
  await prisma.diarioIndividual.deleteMany();
  await prisma.ocorrencia.deleteMany();
  await prisma.vinculoFamiliar.deleteMany();
  await prisma.vivenciaGeral.deleteMany();
  await prisma.avisoGeral.deleteMany();
  await prisma.evento.deleteMany();
  await prisma.bebe.deleteMany();
  await prisma.adi.deleteMany();
  await prisma.responsavel.deleteMany();
  await prisma.turma.deleteMany();
  await prisma.escola.deleteMany();

  const escola = await prisma.escola.create({
    data: {
      nome: 'CMEI Pequenos Gênios',
      endereco: 'Rua das Flores, 123',
      telefone: '(81) 99999-9999',
    },
  });

  // Segunda escola sem vínculos diretos (testa listagem GET /escolas)
  await prisma.escola.create({
    data: {
      nome: 'CMEI Mundo Encantado',
      endereco: 'Av. Brasil, 500',
      telefone: '(81) 95555-0000',
    },
  });

  const turma = await prisma.turma.create({
    data: {
      nome: 'Berçário A',
      anoLetivo: 2026,
      escolaId: escola.id,
    },
  });

  // Segunda turma da mesma escola (testa GET /turmas e filtros por turma)
  const turmaB = await prisma.turma.create({
    data: {
      nome: 'Maternal B',
      anoLetivo: 2026,
      escolaId: escola.id,
    },
  });

  const adi = await prisma.adi.create({
    data: {
      nome: 'Ana Souza',
      matricula: 'ADI-2026-001',
      email: 'ana@escola.com',
      telefone: '(81) 98888-1111',
      senhaHash: 'senha123',
      escolaId: escola.id,
      turmas: {
        connect: { id: turma.id },
      },
    },
  });

  const enzo = await prisma.bebe.create({
    data: {
      nome: 'Enzo Gabriel',
      dataNascimento: new Date('2025-05-20'),
      genero: 'Masculino',
      alergias: 'Lactose',
      medicamentos: 'Vitamina D',
      turmaId: turma.id,
      escolaId: escola.id,
    },
  });

  const maite = await prisma.bebe.create({
    data: {
      nome: 'Maitê Ferreira',
      dataNascimento: new Date('2025-02-10'),
      genero: 'Feminino',
      alergias: 'Amendoim, Corante amarelo',
      observacoesSaude: 'Usa pomada para assadura após cada troca.',
      autorizadosBusca: 'Maria Ferreira, Joana Ferreira (avó)',
      turmaId: turma.id,
      escolaId: escola.id,
    },
  });

  // Bebê na segunda turma (testa que o filtro por turma não mistura crianças)
  const theo = await prisma.bebe.create({
    data: {
      nome: 'Theo Albuquerque',
      dataNascimento: new Date('2024-08-01'),
      genero: 'Masculino',
      turmaId: turmaB.id,
      escolaId: escola.id,
    },
  });

  // Segunda professora, responsável pela turma Maternal B
  const adiB = await prisma.adi.create({
    data: {
      nome: 'Beatriz Lima',
      matricula: 'ADI-2026-002',
      email: 'beatriz@escola.com',
      telefone: '(81) 94444-5555',
      senhaHash: 'senha123',
      escolaId: escola.id,
      turmas: {
        connect: { id: turmaB.id },
      },
    },
  });

  // Responsável com dois filhos vinculados (testa a troca de criança na home)
  await prisma.responsavel.create({
    data: {
      nome: 'Maria Ferreira',
      cpf: '123.456.789-00',
      telefone: '(81) 97777-2222',
      email: 'maria@email.com',
      senhaHash: 'senha123',
      endereco: 'Rua das Acácias, 45 - Indianópolis',
      local_trabalho: 'Av. Central, 129 - Nova Caruaru',
      bebes: {
        create: [
          { bebeId: enzo.id, parentesco: 'Mãe' },
          { bebeId: maite.id, parentesco: 'Mãe' },
        ],
      },
    },
  });

  // Segundo responsável vinculado só ao Enzo (testa contatos no perfil do bebê)
  await prisma.responsavel.create({
    data: {
      nome: 'Carlos Gabriel',
      cpf: '987.654.321-00',
      telefone: '(81) 96666-3333',
      email: 'carlos@email.com',
      senhaHash: 'senha123',
      endereco: 'Rua das Acácias, 45 - Indianópolis',
      bebes: {
        create: [{ bebeId: enzo.id, parentesco: 'Pai' }],
      },
    },
  });

  // Responsável do Theo (turma Maternal B)
  await prisma.responsavel.create({
    data: {
      nome: 'Paula Albuquerque',
      cpf: '111.222.333-44',
      telefone: '(81) 93333-7777',
      email: 'paula@email.com',
      senhaHash: 'senha123',
      endereco: 'Rua do Sol, 78 - Centro',
      local_trabalho: 'Hospital Municipal',
      bebes: {
        create: [{ bebeId: theo.id, parentesco: 'Mãe' }],
      },
    },
  });

  // Diário de hoje do Enzo já preenchido (testa o lado do responsável)
  await prisma.diarioIndividual.create({
    data: {
      data: hojeAs(8),
      frequencia: true,
      chegadaHumor: 'animado',
      alimentacao: 'bem',
      banho: true,
      sono: '12:30 - 14:00',
      desenvolvimentoPedagogico: '3',
      observacoesFinais: 'Dia tranquilo, brincou bastante no parquinho.',
      atividades: JSON.stringify(['Pintura', 'Música', 'Parquinho']),
      fralda: 'Trocou 3x',
      bebeId: enzo.id,
      adiId: adi.id,
    },
  });

  // Histórico de diários do Enzo (testa o calendário com dias marcados)
  await prisma.diarioIndividual.create({
    data: {
      data: diasAtrasAs(1, 8),
      frequencia: true,
      chegadaHumor: 'neutro',
      alimentacao: 'pouco',
      banho: false,
      sono: '13:00 - 14:30',
      desenvolvimentoPedagogico: '2',
      observacoesFinais: 'Comeu pouco no almoço, mas lanchou bem à tarde.',
      atividades: JSON.stringify(['Contação de história', 'Massinha']),
      fralda: 'Trocou 2x',
      bebeId: enzo.id,
      adiId: adi.id,
    },
  });

  // Dia de ausência do Enzo (testa o status "Ausente" no histórico)
  await prisma.diarioIndividual.create({
    data: {
      data: diasAtrasAs(2, 8),
      frequencia: false,
      bebeId: enzo.id,
      adiId: adi.id,
    },
  });

  // Diário de ontem da Maitê (hoje fica pendente de propósito para testar o fluxo de preenchimento)
  await prisma.diarioIndividual.create({
    data: {
      data: diasAtrasAs(1, 8),
      frequencia: true,
      chegadaHumor: 'agitado',
      alimentacao: 'bem',
      banho: true,
      sono: '12:00 - 13:15',
      desenvolvimentoPedagogico: '4',
      observacoesFinais: 'Muito participativa na roda de música.',
      atividades: JSON.stringify(['Música', 'Blocos de montar']),
      fralda: 'Trocou 4x',
      bebeId: maite.id,
      adiId: adi.id,
    },
  });

  // Diário de hoje do Theo, preenchido pela professora da turma B
  await prisma.diarioIndividual.create({
    data: {
      data: hojeAs(8, 30),
      frequencia: true,
      chegadaHumor: 'animado',
      alimentacao: 'bem',
      banho: true,
      sono: '12:45 - 14:10',
      desenvolvimentoPedagogico: '3',
      observacoesFinais: 'Primeiros passos sem apoio hoje!',
      atividades: JSON.stringify(['Circuito motor', 'Parquinho']),
      fralda: 'Trocou 3x',
      bebeId: theo.id,
      adiId: adiB.id,
    },
  });

  // Ocorrência de hoje (testa o card de ocorrências da professora)
  await prisma.ocorrencia.create({
    data: {
      titulo: 'Arranhão leve no braço',
      descricao: 'Maitê se arranhou brincando no tapete. Aplicado curativo simples.',
      dia: hojeAs(10, 15),
      horario: hojeAs(10, 15),
      prioridade: 'BAIXA',
      bebeId: maite.id,
      adiId: adi.id,
    },
  });

  // Eventos no calendário da turma
  await prisma.evento.create({
    data: {
      titulo: 'Reunião de pais',
      descricao: 'Reunião semestral com os responsáveis da turma.',
      local: 'Auditório da escola',
      dataEvento: diasAPartirDeHoje(3),
      horario_inicio: hojeAs(18),
      horario_fim: hojeAs(19, 30),
      escolaId: escola.id,
      turmaId: turma.id,
    },
  });

  await prisma.evento.create({
    data: {
      titulo: 'Festa Junina',
      descricao: 'Festa junina com comidas típicas e apresentações das crianças.',
      local: 'Pátio da escola',
      dataEvento: diasAPartirDeHoje(10),
      horario_inicio: hojeAs(15),
      horario_fim: hojeAs(18),
      escolaId: escola.id,
      turmaId: turma.id,
    },
  });

  // Ocorrência antiga (testa que o card conta só as de hoje)
  await prisma.ocorrencia.create({
    data: {
      titulo: 'Febre baixa',
      descricao: 'Enzo apresentou 37,8°C após o almoço. Responsável avisado por telefone.',
      dia: diasAtrasAs(3, 13),
      horario: diasAtrasAs(3, 13),
      prioridade: 'MEDIA',
      bebeId: enzo.id,
      adiId: adi.id,
    },
  });

  // Evento da outra turma (testa que o calendário filtra por turma)
  await prisma.evento.create({
    data: {
      titulo: 'Passeio ao parque',
      descricao: 'Passeio da turma Maternal B ao parque municipal.',
      local: 'Parque Municipal',
      dataEvento: diasAPartirDeHoje(7),
      horario_inicio: hojeAs(9),
      horario_fim: hojeAs(11, 30),
      escolaId: escola.id,
      turmaId: turmaB.id,
    },
  });

  // Vivências gerais da turma (tabela VivenciaGeral)
  await prisma.vivenciaGeral.create({
    data: {
      data: hojeAs(9),
      titulo: 'Semana das cores',
      descricao: 'A turma explorou as cores primárias com tinta guache e papel kraft.',
      fotosJson: JSON.stringify([]),
      turmaId: turma.id,
      adiId: adi.id,
    },
  });

  await prisma.vivenciaGeral.create({
    data: {
      data: diasAtrasAs(2, 10),
      titulo: 'Hora da história',
      descricao: 'Leitura do livro "O Pequeno Príncipe" adaptado para bebês.',
      fotosJson: JSON.stringify([]),
      turmaId: turma.id,
      adiId: adi.id,
    },
  });

  // Avisos gerais da escola (tabela AvisoGeral)
  await prisma.avisoGeral.create({
    data: {
      titulo: 'Recesso de São João',
      conteudo: 'A escola estará fechada nos dias 23 e 24 de junho.',
      dataExpiracao: diasAPartirDeHoje(15),
      escolaId: escola.id,
    },
  });

  await prisma.avisoGeral.create({
    data: {
      titulo: 'Campanha de vacinação',
      conteudo: 'Tragam a caderneta de vacinação atualizada até o fim do mês.',
      dataExpiracao: diasAPartirDeHoje(20),
      escolaId: escola.id,
    },
  });

  console.log('Seed finalizado!');
  console.log('Logins de teste:');
  console.log('  Professora (Berçário A):  ana@escola.com     / senha123');
  console.log('  Professora (Maternal B):  beatriz@escola.com / senha123');
  console.log('  Responsável (2 filhos):   maria@email.com    / senha123');
  console.log('  Responsável (Enzo):       carlos@email.com   / senha123');
  console.log('  Responsável (Theo):       paula@email.com    / senha123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
