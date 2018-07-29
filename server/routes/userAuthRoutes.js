import express from 'express';
import usersController from '../controllers/usersController';
import validator from '../middlewares/userAuthValidator';

const { userSignup, userSignin } = usersController;

const { signupValidator } = validator;

const userRouter = express.Router();

userRouter.post('/auth/signup', signupValidator, userSignup);
userRouter.post('/auth/login', userSignin);

export default userRouter;
