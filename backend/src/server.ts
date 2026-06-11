import express from 'express';
import { bebeRoutes } from './routes/bebe.routes';
import { diarioRoutes } from './routes/diario.routes';
import { responsavelRoutes } from './routes/responsavel.routes';
import { adiRoutes } from './routes/adi.routes';
import { escolaRoutes } from './routes/escola.routes';
import { dashboardRoutes } from './routes/dashboard.routes';
import { turmaRoutes } from './routes/turma.routes';
import { eventoRoutes } from './routes/evento.routes';
import { ocorrenciaRoutes } from './routes/ocorrencia.routes';
import { vinculoRoutes } from './routes/vinculo.routes';
import { authRoutes } from './routes/auth.routes';


const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_ORIGIN || '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  return next();
});

app.use(express.json());

// Registra as rotas de bebê com o prefixo /bebes
app.use('/auth', authRoutes);
app.use('/bebes', bebeRoutes);
app.use('/diarios', diarioRoutes);
app.use('/responsaveis', responsavelRoutes);
app.use('/adis', adiRoutes);
app.use('/escolas', escolaRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/turmas', turmaRoutes);
app.use('/eventos', eventoRoutes);
app.use('/ocorrencias', ocorrenciaRoutes);
app.use('/vinculo', vinculoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
