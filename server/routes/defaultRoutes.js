import express from 'express';

const defaultRouter = express.Router();

defaultRouter.get('/', (request, response) => response.status(200)
  .json({
    message: 'Welcome to Marcodynamics MyDiary App! Create an account and start penning down your Thoughts/Feelings.'
  }));

defaultRouter.all('*', (request, response) => response.status(404)
  .json({
    message: 'Oops! 404. Page not Found',
  }));

export default defaultRouter;
