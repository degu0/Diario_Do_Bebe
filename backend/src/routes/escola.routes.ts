import { Router } from 'express';
import { EscolaController } from '../controllers/EscolaController';

const escolaRoutes = Router();
const escolaController = new EscolaController();

// Define as rotas específicas para Bebê
escolaRoutes.post('/', escolaController.store);
escolaRoutes.get('/', escolaController.index);
escolaRoutes.delete('/:id', escolaController.delete);
escolaRoutes.patch('/:id', escolaController.update);

export { escolaRoutes };
