// External modules
import { Router } from 'express';

// Internal modules
import authRoutes from '../auth/auth.route';
import userRoutes from '../user/user.route';
import postRoutes from '../post/post.routes'
const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);
routes.use('/post', postRoutes);

export default routes;
