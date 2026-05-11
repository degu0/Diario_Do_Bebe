import express from 'express';
import { bebeRoutes } from './routes/bebe.routes';
import { diarioRoutes } from './routes/diario.routes';
import { responsavelRoutes } from './routes/responsavel.routes';
import { adiRoutes } from './routes/adi.routes';
import { escolaRoutes } from './routes/escola.routes';

const app = express();

app.use(express.json());

// Registra as rotas de bebê com o prefixo /bebes
app.use('/bebes', bebeRoutes);
app.use('/diarios', diarioRoutes);
app.use('/responsaveis', responsavelRoutes);
app.use('/adis', adiRoutes);
app.use('/escolas', escolaRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
