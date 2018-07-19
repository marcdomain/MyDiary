import express from 'express';
import entriesController from '../controllers/entriesController';
import usersController from '../controllers/usersController';
import entriesValidator from '../middlewares/entriesValidator';
import userAuthValidator from '../middlewares/userAuthValidator';

const {
  getAllEntries, getADiaryEntry, postEntry, modifyEntry
} = entriesController;
const { userSignUp, userSignin } = usersController;
const { getADiaryEntryValidator, modifyEntryValidator, postEntryValidator } = entriesValidator;
const { signupValidator, signinValidator } = userAuthValidator;

const router = express.Router();

router.get('/entries', getAllEntries);
router.get('/entries/:entryId', getADiaryEntryValidator, getADiaryEntry);
router.post('/entries', postEntryValidator, postEntry);
router.put('/entries/:entryId', modifyEntryValidator, modifyEntry);
router.post('/users/signup', signupValidator, userSignUp);
router.post('/users/signin', signinValidator, userSignin);

router.get('/', (req, res) => res.status(200)
  .json({
    message: 'Welcome to Marcodynamics MyDiary App! Create an account and start penning down your Thoughts/Feelings.'
  }));

router.all('*', (req, res) => res.status(404)
  .json({
    message: 'Oops! 404. Page not Found',
  }));

export default router;
