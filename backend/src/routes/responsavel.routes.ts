import { Router } from 'express';
import { ResponsavelController } from '../controllers/ResponsavelController';

const responsavelRoutes = Router();
const responsavelController = new ResponsavelController();

// Define as rotas específicas para Bebê
responsavelRoutes.post('/', responsavelController.store);
responsavelRoutes.get('/', responsavelController.index);
responsavelRoutes.delete('/:id', responsavelController.delete);
responsavelRoutes.patch('/:id', responsavelController.update);

export { responsavelRoutes };
