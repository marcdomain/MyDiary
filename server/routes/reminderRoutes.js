import express from 'express';
import reminderscontroller from '../controllers/remindersController';
import verify from '../middlewares/authenticator';

const { verifyToken } = verify;

const { setReminder, deleteReminder } = reminderscontroller;

const reminderRouter = express.Router();

reminderRouter.post('/reminders', verifyToken, setReminder);
reminderRouter.delete('/reminders/:reminderId', verifyToken, deleteReminder);

export default reminderRouter;
