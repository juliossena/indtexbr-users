import { Router } from 'express';
import { auth } from '../controllers/authController';

const authRouter = Router();

authRouter.post('/', auth);

export default authRouter;
