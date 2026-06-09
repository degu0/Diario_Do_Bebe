import { Router } from 'express';
import { DashboardController } from '../controllers/DashboardController';

const dashboardRoutes = Router();
const dashboardController = new DashboardController();

// Define as rotas específicas para Bebê
dashboardRoutes.get('/:ADIid/:TURMAid', dashboardController.getDashboard);
dashboardRoutes.get('/parents/:ParentID/:BabyID', dashboardController.getDashboardParents);

export { dashboardRoutes };
