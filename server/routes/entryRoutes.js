import express from 'express';
import entriesController from '../controllers/entriesController';
import entriesValidator from '../middlewares/entriesValidator';
import verify from '../middlewares/authenticator';

const { verifyToken } = verify;

const {
  getAllEntries, getADiaryEntry, postEntry, modifyEntry
} = entriesController;
const { modifyEntryValidator } = entriesValidator;

const entriesRouter = express.Router();

entriesRouter.get('/entries', verifyToken, getAllEntries);
// entriesRouter.get('/entries/:entryId', verifyToken, getADiaryEntry);
// entriesRouter.post('/entries', verifyToken, postEntry);
// entriesRouter.put('/entries/:entryId', modifyEntryValidator, modifyEntry);

export default entriesRouter;
