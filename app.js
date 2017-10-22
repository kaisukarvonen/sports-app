import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import NodeMonkey from 'node-monkey';
import router from './routes/index';

const dbUrl = 'mongodb://localhost:27017/sports-db';
MongoClient.connect(dbUrl, (err, db) => {
  if (err) {
    throw err;
  }
  // db.collection('Sports', (err, collection) => {
  //   collection.insert({
  //     _id: ObjectId(), name: 'Kuntosali', date: new Date(), duration: 2, comments: 'Jalkatreeni'
  //   });
  // })
  db.collection('Sports').count(function (err, count) {
    if (err) throw err;

    console.log('Total Rows: ' + count);
  });
});


NodeMonkey({
  server: {
    disableLocalOutput: false
  }
});
//default http://0.0.0.0:50500/


const app = express();
app.use('/', router);
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.listen(app.get('port'), () => {
  console.log('app started');
});
