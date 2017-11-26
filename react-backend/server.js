import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import sportsController from './routes/sportsController';
import userController from './routes/userController';

const MongoStore = connectMongo(session);
mongoose.connect('mongodb://localhost/sports-app');
const db = mongoose.connection;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'AQ5fjzsdlk345qkcosUQ656sd1vbB1a',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db,
  }),
}));

app.use('/sports', sportsController);
app.use('/user', userController);

app.listen(3001, () => {
  console.log('Listening on port 3001');
});
