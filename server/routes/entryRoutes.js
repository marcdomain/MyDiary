import express from 'express';
import entriesController from '../controllers/entriesController';
import usersController from '../controllers/usersController';

const { getAllEntries, getADiaryEntry, postEntry, modifyEntry } = entriesController;
const { userSignUp, userSignin } = usersController;

const router = express.Router();

router.get("/entries", getAllEntries);
router.get("/entries/:entryId", getADiaryEntry);
router.post("/entries", postEntry);
router.put("/entries/:entryId", modifyEntry);
router.post("/users/signup", userSignUp);
router.post("/users/signin", userSignin);

export default router;
