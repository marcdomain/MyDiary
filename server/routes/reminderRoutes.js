import express from 'express';
import reminderscontroller from '../controllers/remindersController';
import verify from '../middlewares/authenticator';

const { verifyToken } = verify;

const { postReminder, deleteReminder } = reminderscontroller;

const reminderRouter = express.Router();

reminderRouter.post('/reminders', verifyToken, postReminder);
reminderRouter.delete('/reminders/:reminderId', verifyToken, deleteReminder);

export default reminderRouter;
