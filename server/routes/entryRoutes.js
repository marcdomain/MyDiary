import express from 'express';
import entriesController from '../controllers/entriesController';

const { getAllEntries } = entriesController;

const router = express.Router();

router.get("/entries", getAllEntries);

export default router;