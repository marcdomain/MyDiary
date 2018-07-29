import express from 'express';
import usersController from '../controllers/usersController';

const { userSignup, userSignin } = usersController;

const userRouter = express.Router();

userRouter.post('/auth/signup', userSignup);
userRouter.post('/auth/login', userSignin);

export default userRouter;
