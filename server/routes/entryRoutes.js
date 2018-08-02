import express from 'express';
import entriesController from '../controllers/entriesController';
import { verifyToken } from '../middlewares/authenticator';
import validation from '../middlewares/entriesValidator';

const { postEntryValidator, modifyEntryValidator } = validation;

const {
  getAllEntries, getDiaryEntry, postEntry, modifyEntry, deleteEntry
} = entriesController;

const entriesRouter = express.Router();

entriesRouter.get('/entries', verifyToken, getAllEntries);
entriesRouter.get('/entries/:entryId', verifyToken, getDiaryEntry);
entriesRouter.post('/entries', postEntryValidator, verifyToken, postEntry);
entriesRouter.put('/entries/:entryId', modifyEntryValidator, verifyToken, modifyEntry);
entriesRouter.delete('/entries/:entryId', verifyToken, deleteEntry);

export default entriesRouter;
