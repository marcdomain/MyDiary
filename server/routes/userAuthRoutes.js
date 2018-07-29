import express from 'express';
import usersController from '../controllers/usersController';
import validator from '../middlewares/userAuthValidator';

const { userSignup, userSignin } = usersController;

const { signupValidator, signinValidator } = validator;

const userRouter = express.Router();

userRouter.post('/auth/signup', signupValidator, userSignup);
userRouter.post('/auth/login', signinValidator, userSignin);

export default userRouter;
