import express from 'express';
import entriesController from '../controllers/entriesController';

const { getAllEntries, getADiaryEntry } = entriesController;

const router = express.Router();

router.get("/entries", getAllEntries);
router.get("/entries/:entryId", getADiaryEntry);

export default router;
