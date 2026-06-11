import { Router } from 'express';
import { DiarioController } from '../controllers/DiarioController';
import { ensureAuthenticated } from '../middlewares/auth';

const diarioRoutes = Router();
const diarioController = new DiarioController();

// Define as rotas específicas para Bebê
diarioRoutes.post('/presenca', ensureAuthenticated, diarioController.storePresence);
diarioRoutes.post('/', ensureAuthenticated, diarioController.store);
diarioRoutes.get('/', ensureAuthenticated, diarioController.index);
diarioRoutes.get('/bebe/:bebeId', ensureAuthenticated, diarioController.byBebe);
diarioRoutes.get('/:id', ensureAuthenticated, diarioController.diary);
diarioRoutes.delete('/:id', ensureAuthenticated, diarioController.delete);
diarioRoutes.patch('/:id', ensureAuthenticated, diarioController.update);

export { diarioRoutes };
