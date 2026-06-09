import { Router } from 'express';
import { VinculoController } from '../controllers/VinculoController';

const vinculoRoutes = Router();
const vinculoController = new VinculoController();

// Define as rotas específicas para Bebê
vinculoRoutes.post('/:responsavelId/:bebeId', vinculoController.vincularFilho);


export { vinculoRoutes };
