/*
  Warnings:

  - You are about to drop the `_BebeResponsavel` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `escolaId` to the `Bebe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BebeResponsavel" DROP CONSTRAINT "_BebeResponsavel_A_fkey";

-- DropForeignKey
ALTER TABLE "_BebeResponsavel" DROP CONSTRAINT "_BebeResponsavel_B_fkey";

-- AlterTable
ALTER TABLE "ADI" ADD COLUMN     "telefone" TEXT;

-- AlterTable
ALTER TABLE "Bebe" ADD COLUMN     "escolaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "DiarioIndividual" ADD COLUMN     "atividades" TEXT,
ADD COLUMN     "fralda" TEXT,
ADD COLUMN     "observacoesFinais" TEXT;

-- AlterTable
ALTER TABLE "Ocorrencia" ADD COLUMN     "dia" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "_BebeResponsavel";

-- CreateTable
CREATE TABLE "vinculo_familiar" (
    "id" SERIAL NOT NULL,
    "bebeId" INTEGER NOT NULL,
    "responsavelId" INTEGER NOT NULL,
    "parentesco" TEXT NOT NULL,

    CONSTRAINT "vinculo_familiar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataEvento" TIMESTAMP(3),
    "horario_inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "horario_fim" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "escolaId" INTEGER NOT NULL,
    "turmaId" INTEGER NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vinculo_familiar_bebeId_responsavelId_key" ON "vinculo_familiar"("bebeId", "responsavelId");

-- AddForeignKey
ALTER TABLE "Bebe" ADD CONSTRAINT "Bebe_escolaId_fkey" FOREIGN KEY ("escolaId") REFERENCES "Escola"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vinculo_familiar" ADD CONSTRAINT "vinculo_familiar_bebeId_fkey" FOREIGN KEY ("bebeId") REFERENCES "Bebe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vinculo_familiar" ADD CONSTRAINT "vinculo_familiar_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "Responsavel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_escolaId_fkey" FOREIGN KEY ("escolaId") REFERENCES "Escola"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "Turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
