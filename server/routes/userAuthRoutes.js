import express from 'express';
import usersController from '../controllers/usersController';
import userAuthValidator from '../middlewares/userAuthValidator';

const { userSignUp, userSignin } = usersController;
const { signupValidator, signinValidator } = userAuthValidator;

const userRouter = express.Router();

userRouter.post('/users/signup', signupValidator, userSignUp);
userRouter.post('/users/signin', signinValidator, userSignin);

export default userRouter;
