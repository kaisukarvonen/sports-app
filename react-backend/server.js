import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import sportsController from './routes/sportsController';
import userController from './routes/userController';

mongoose.connect('mongodb://localhost/sports-app');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'AQ5fjzsdlk345qkcosUQ656sd1vbB1a',
  resave: true,
  saveUninitialized: false,
}));

app.use('/sports', sportsController);
app.use('/user', userController);

app.listen(3001, () => {
  console.log('Listening on port 3001');
});
