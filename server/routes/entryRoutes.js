import express from 'express';
import entriesController from '../controllers/entriesController';

const { getAllEntries, getADiaryEntry, postEntry } = entriesController;

const router = express.Router();

router.get("/entries", getAllEntries);
router.get("/entries/:entryId", getADiaryEntry);
router.post("/entries", postEntry);

export default router;
