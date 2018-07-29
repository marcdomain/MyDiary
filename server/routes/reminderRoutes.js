import express from 'express';
import reminderscontroller from '../controllers/remindersController';
import verify from '../middlewares/authenticator';

const { verifyToken } = verify;

const { postReminder } = reminderscontroller;

const reminderRouter = express.Router();

reminderRouter.post('/entries', verifyToken, postReminder);

export default reminderRouter;
