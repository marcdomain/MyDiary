import express from 'express';
import entriesController from '../controllers/entriesController';
import verify from '../middlewares/authenticator';
import validation from '../middlewares/entriesValidator';

const { postEntryValidator, modifyEntryValidator } = validation;

const { verifyToken } = verify;

const {
  getAllEntries, getADiaryEntry, postEntry, modifyEntry, deleteEntry
} = entriesController;

const entriesRouter = express.Router();

entriesRouter.get('/entries', verifyToken, getAllEntries);
entriesRouter.get('/entries/:entryId', verifyToken, getADiaryEntry);
entriesRouter.post('/entries', postEntryValidator, verifyToken, postEntry);
entriesRouter.put('/entries/:entryId', modifyEntryValidator, verifyToken, modifyEntry);
entriesRouter.delete('/entries/:entryId', verifyToken, deleteEntry);

export default entriesRouter;
