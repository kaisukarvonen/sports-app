import express from 'express';
import mongoose from 'mongoose';
import sportsController from './routes/sportsController';

mongoose.connect('mongodb://localhost/sports-app');

const app = express();
app.use('/sports', sportsController);

app.listen(3001, () => {
  console.log('Listening on port 3001')
});
