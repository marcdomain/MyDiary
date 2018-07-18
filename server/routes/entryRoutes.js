import express from 'express';
import entriesController from '../controllers/entriesController';

const { getAllEntries, getADiaryEntry, postEntry, modifyEntry } = entriesController;

const router = express.Router();

router.get("/entries", getAllEntries);
router.get("/entries/:entryId", getADiaryEntry);
router.post("/entries", postEntry);
router.put("/entries/:entryId", modifyEntry);

export default router;
