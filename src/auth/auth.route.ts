// External modules
import { Router } from 'express';

// Internal modules
import authController from './auth.controller';

const routes = Router();

routes.post('/login', authController.login);

export default routes;