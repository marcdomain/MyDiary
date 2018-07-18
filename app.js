import express from 'express';
import bodyParser from 'body-parser';
import router from './server/routes/entryRoutes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', router);
app.use(router);

const port = process.env.PORT || 3310;
app.listen(port, () => {
  console.log('server listening on port', port);
});

export default app;
