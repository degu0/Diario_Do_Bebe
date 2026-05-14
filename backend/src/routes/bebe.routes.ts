import { Router } from 'express';
import { BebeController } from '../controllers/BebeController';

const bebeRoutes = Router();
const bebeController = new BebeController();

// Define as rotas específicas para Bebê
bebeRoutes.post('/', bebeController.store);
bebeRoutes.get('/', bebeController.index);
bebeRoutes.delete('/:id', bebeController.delete);
bebeRoutes.patch('/:id', bebeController.update);
bebeRoutes.get('/:TURMAid', bebeController.class);
bebeRoutes.get('/:BEBEid', bebeController.profile);

export { bebeRoutes };
