import { Router } from 'express';
import { AdiController } from '../controllers/AdiController';
import { ensureAuthenticated } from '../middlewares/auth';

const adiRoutes = Router();
const adiController = new AdiController();

// Define as rotas específicas para Bebê
adiRoutes.post('/', adiController.store);
adiRoutes.get('/', adiController.index);
adiRoutes.get('/:ADIid', ensureAuthenticated, adiController.profile);
adiRoutes.delete('/:id', adiController.delete);
adiRoutes.patch('/:id', adiController.update);

export { adiRoutes };
