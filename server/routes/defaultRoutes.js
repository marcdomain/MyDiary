import express from 'express';

const defaultRouter = express.Router();

defaultRouter.get('/', (req, res) => res.status(200)
  .json({
    message: 'Welcome to Marcodynamics MyDiary App! Create an account and start penning down your Thoughts/Feelings.'
  }));

defaultRouter.all('*', (req, res) => res.status(404)
  .json({
    message: 'Oops! 404. Page not Found',
  }));

export default defaultRouter;
