import { Router } from 'express';
import { EventoController } from '../controllers/EventoController';

const eventoRoutes = Router();
const eventoController = new EventoController();

// Define as rotas específicas para Bebê
eventoRoutes.post('/', eventoController.store);
eventoRoutes.get('/', eventoController.index);
eventoRoutes.delete('/:id', eventoController.delete);
eventoRoutes.patch('/:id', eventoController.update);

export { eventoRoutes };
