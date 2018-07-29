import express from 'express';
import bodyParser from 'body-parser';
import router from './server/routes/index';
// import tables from './server/controllers/db/createTablesController';

// const { createTable } = tables;

const { defaultRouter, userRouter, entriesRouter } = router;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', userRouter);
app.use('/api/v1', entriesRouter);
// app.use('/', createTable);
app.use('/', defaultRouter);

const port = process.env.PORT || 3310;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log('server listening on port', port);
});

export default app;
