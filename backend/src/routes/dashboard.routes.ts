import { Router } from 'express';
import { DashboardController } from '../controllers/DashboardController';
import { ensureAuthenticated } from '../middlewares/auth';

const dashboardRoutes = Router();
const dashboardController = new DashboardController();

// Define as rotas específicas para Bebê
dashboardRoutes.get('/parents/:ParentID/:BabyID', ensureAuthenticated, dashboardController.getDashboardParents);
dashboardRoutes.get('/:ADIid/:TURMAid', ensureAuthenticated, dashboardController.getDashboard);

export { dashboardRoutes };
