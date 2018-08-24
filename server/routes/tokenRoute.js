import express from 'express'
import { verifyToken } from '../middlewares/authenticator';

const router = express.Router();

router.get('/token', verifyToken);

export default router;
