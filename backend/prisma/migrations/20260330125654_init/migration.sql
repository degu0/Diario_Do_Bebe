-- CreateTable
CREATE TABLE "Escola" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT,
    "telefone" TEXT,

    CONSTRAINT "Escola_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Turma" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "anoLetivo" INTEGER NOT NULL,
    "escolaId" INTEGER NOT NULL,

    CONSTRAINT "Turma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bebe" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3),
    "genero" TEXT,
    "alergias" TEXT,
    "medicamentos" TEXT,
    "observacoesSaude" TEXT,
    "autorizadosBusca" TEXT,
    "fotoUrl" TEXT,
    "turmaId" INTEGER NOT NULL,

    CONSTRAINT "Bebe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Responsavel" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "endereco" TEXT,

    CONSTRAINT "Responsavel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ADI" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "escolaId" INTEGER NOT NULL,

    CONSTRAINT "ADI_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiarioIndividual" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "frequencia" BOOLEAN NOT NULL DEFAULT true,
    "chegadaHumor" TEXT,
    "alimentacao" TEXT,
    "banho" BOOLEAN NOT NULL DEFAULT false,
    "sono" TEXT,
    "desenvolvimentoPedagogico" TEXT,
    "enviadoEm" TIMESTAMP(3),
    "bebeId" INTEGER NOT NULL,
    "adiId" INTEGER NOT NULL,

    CONSTRAINT "DiarioIndividual_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ocorrencia" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "horario" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "prioridade" TEXT NOT NULL DEFAULT 'BAIXA',
    "bebeId" INTEGER NOT NULL,
    "adiId" INTEGER NOT NULL,

    CONSTRAINT "Ocorrencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VivenciaGeral" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "fotosJson" JSONB,
    "turmaId" INTEGER NOT NULL,
    "adiId" INTEGER NOT NULL,

    CONSTRAINT "VivenciaGeral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvisoGeral" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataExpiracao" TIMESTAMP(3),
    "escolaId" INTEGER NOT NULL,

    CONSTRAINT "AvisoGeral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BebeResponsavel" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BebeResponsavel_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ADITurma" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ADITurma_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Responsavel_cpf_key" ON "Responsavel"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Responsavel_email_key" ON "Responsavel"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ADI_matricula_key" ON "ADI"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "ADI_email_key" ON "ADI"("email");

-- CreateIndex
CREATE INDEX "_BebeResponsavel_B_index" ON "_BebeResponsavel"("B");

-- CreateIndex
CREATE INDEX "_ADITurma_B_index" ON "_ADITurma"("B");

-- AddForeignKey
ALTER TABLE "Turma" ADD CONSTRAINT "Turma_escolaId_fkey" FOREIGN KEY ("escolaId") REFERENCES "Escola"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bebe" ADD CONSTRAINT "Bebe_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ADI" ADD CONSTRAINT "ADI_escolaId_fkey" FOREIGN KEY ("escolaId") REFERENCES "Escola"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiarioIndividual" ADD CONSTRAINT "DiarioIndividual_bebeId_fkey" FOREIGN KEY ("bebeId") REFERENCES "Bebe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiarioIndividual" ADD CONSTRAINT "DiarioIndividual_adiId_fkey" FOREIGN KEY ("adiId") REFERENCES "ADI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ocorrencia" ADD CONSTRAINT "Ocorrencia_bebeId_fkey" FOREIGN KEY ("bebeId") REFERENCES "Bebe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ocorrencia" ADD CONSTRAINT "Ocorrencia_adiId_fkey" FOREIGN KEY ("adiId") REFERENCES "ADI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VivenciaGeral" ADD CONSTRAINT "VivenciaGeral_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VivenciaGeral" ADD CONSTRAINT "VivenciaGeral_adiId_fkey" FOREIGN KEY ("adiId") REFERENCES "ADI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvisoGeral" ADD CONSTRAINT "AvisoGeral_escolaId_fkey" FOREIGN KEY ("escolaId") REFERENCES "Escola"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BebeResponsavel" ADD CONSTRAINT "_BebeResponsavel_A_fkey" FOREIGN KEY ("A") REFERENCES "Bebe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BebeResponsavel" ADD CONSTRAINT "_BebeResponsavel_B_fkey" FOREIGN KEY ("B") REFERENCES "Responsavel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ADITurma" ADD CONSTRAINT "_ADITurma_A_fkey" FOREIGN KEY ("A") REFERENCES "ADI"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ADITurma" ADD CONSTRAINT "_ADITurma_B_fkey" FOREIGN KEY ("B") REFERENCES "Turma"("id") ON DELETE CASCADE ON UPDATE CASCADE;
