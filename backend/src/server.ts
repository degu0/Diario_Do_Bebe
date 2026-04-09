import express from 'express';
import { bebeRoutes } from './routes/bebe.routes';

const app = express();

app.use(express.json());

// Registra as rotas de bebê com o prefixo /bebes
app.use('/bebes', bebeRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
