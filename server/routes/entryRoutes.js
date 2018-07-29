import express from 'express';
import entriesController from '../controllers/entriesController';
import entriesValidator from '../middlewares/entriesValidator';
import verifyToken from '../middlewares/verify';

const {
  getAllEntries, getADiaryEntry, postEntry, modifyEntry
} = entriesController;
const { getADiaryEntryValidator, modifyEntryValidator } = entriesValidator;

const entriesRouter = express.Router();

entriesRouter.get('/entries', getAllEntries);
entriesRouter.get('/entries/:entryId', getADiaryEntryValidator, getADiaryEntry);
entriesRouter.post('/entries', verifyToken, postEntry);
entriesRouter.put('/entries/:entryId', modifyEntryValidator, modifyEntry);

export default entriesRouter;
