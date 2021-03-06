import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ORIGIN, MONGOURL } from './config';
import sportsController from './routes/sportsController';
import userController from './routes/userController';

mongoose.connect(MONGOURL);

const app = express();
app.use(cors({ origin: ORIGIN }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/sports', sportsController);
app.use('/user', userController);
app.listen(3001, () => {
  console.log('Listening on port 3001');
});
