import express from 'express';
import { prisma } from './lib/prisma';

const app = express();

// Middleware para o Express entender JSON no corpo das requisições
app.use(express.json());

// Nossa primeira Rota de Teste (Hello World + Banco de Dados)
app.get('/bebes', async (req, res) => {
  try {
    const bebes = await prisma.bebe.findMany();
    return res.json(bebes);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar bebês' });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
