import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {
  defaultRouter, userRouter, entriesRouter, reminderRouter,
} from './server/routes/index';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'views')));

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Access-token');
  next();
});

app.use('/api/v1', userRouter);
app.use('/api/v1', entriesRouter);
app.use('/api/v1', reminderRouter);
app.use('/', defaultRouter);

const port = process.env.PORT || 3310;
app.listen(port, () => {
  console.log('server listening on port', port);
});

export default app;
