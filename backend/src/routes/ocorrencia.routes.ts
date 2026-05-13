import { Router } from 'express';
import { OcorrenciaController } from '../controllers/OcorrenciaController';

const ocorrenciaRoutes = Router();
const ocorrenciaController = new OcorrenciaController();

// Define as rotas específicas para Bebê
ocorrenciaRoutes.post('/', ocorrenciaController.store);
ocorrenciaRoutes.get('/', ocorrenciaController.index);
ocorrenciaRoutes.delete('/:id', ocorrenciaController.delete);
ocorrenciaRoutes.patch('/:id', ocorrenciaController.update);

export { ocorrenciaRoutes };
