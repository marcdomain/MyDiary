import express from 'express';
import entriesController from '../controllers/entriesController';
import usersController from '../controllers/usersControlller';

const { getAllEntries, getADiaryEntry, postEntry, modifyEntry } = entriesController;
const { userSignUp } = usersController;

const router = express.Router();

router.get("/entries", getAllEntries);
router.get("/entries/:entryId", getADiaryEntry);
router.post("/entries", postEntry);
router.put("/entries/:entryId", modifyEntry);
router.post("/users", userSignUp);

export default router;
