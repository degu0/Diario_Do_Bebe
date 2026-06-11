import { Router } from 'express';
import { ResponsavelController } from '../controllers/ResponsavelController';
import { ensureAuthenticated } from '../middlewares/auth';

const responsavelRoutes = Router();
const responsavelController = new ResponsavelController();

// Define as rotas específicas para Bebê
responsavelRoutes.post('/', responsavelController.store);
responsavelRoutes.get('/', responsavelController.index);
responsavelRoutes.get('/:responsavelId', ensureAuthenticated, responsavelController.profile);
responsavelRoutes.delete('/:id', responsavelController.delete);
responsavelRoutes.patch('/:id', responsavelController.update);

export { responsavelRoutes };
