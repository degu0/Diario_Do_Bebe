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

async function main() {
  console.log('🌱 Iniciando o seed...');

  const escola = await prisma.escola.create({
    data: {
      nome: 'CMEI Pequenos Gênios',
      endereco: 'Rua das Flores, 123',
      telefone: '(81) 99999-9999',
    },
  });

  const turma = await prisma.turma.create({
    data: {
      nome: 'Berçário A',
      anoLetivo: 2026,
      escolaId: escola.id,
    },
  });

  await prisma.aDI.create({
    data: {
      nome: 'Ana Souza',
      matricula: 'ADI-2026-001',
      email: 'ana@escola.com',
      senhaHash: 'senha123',
      escolaId: escola.id,
      turmas: {
        connect: { id: turma.id }
      }
    },
  });

  await prisma.bebe.create({
    data: {
      nome: 'Enzo Gabriel',
      dataNascimento: new Date('2025-05-20'),
      genero: 'Masculino',
      alergias: 'Lactose',
      turmaId: turma.id,
    },
  });

  console.log('Seed finalizado!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
