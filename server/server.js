import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import cors from 'cors';
import sportsController from './routes/sportsController';
import userController from './routes/userController';

mongoose.connect('mongodb://mongodb/sports-app');

const app = express();
app.use(cors({origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/sports', sportsController);
app.use('/user', userController);
app.listen(3001, () => {
  console.log('Listening on port 3001');
});
