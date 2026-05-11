import { Router } from 'express';
import { DiarioController } from '../controllers/DiarioController';

const diarioRoutes = Router();
const diarioController = new DiarioController();

// Define as rotas específicas para Bebê
diarioRoutes.post('/', diarioController.store);
diarioRoutes.get('/', diarioController.index);
diarioRoutes.delete('/:id', diarioController.delete);
diarioRoutes.patch('/:id', diarioController.update);

export { diarioRoutes };
