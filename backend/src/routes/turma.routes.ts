import { Router } from 'express';
import { TurmaController } from '../controllers/TurmaController';

const turmaRoutes = Router();
const turmaController = new TurmaController();

// Define as rotas específicas para Bebê
turmaRoutes.post('/', turmaController.store);
turmaRoutes.get('/', turmaController.index);
turmaRoutes.delete('/:id', turmaController.delete);
turmaRoutes.patch('/:id', turmaController.update);

export { turmaRoutes };
