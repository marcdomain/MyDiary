import express from 'express';
import usersController from '../controllers/usersController';
import userAuthValidator from '../middlewares/userAuthValidator';

const { userSignup, userSignin } = usersController;
const { signinValidator } = userAuthValidator;

const userRouter = express.Router();

userRouter.post('/auth/signup', userSignup);
userRouter.post('/users/signin', signinValidator, userSignin);

export default userRouter;
