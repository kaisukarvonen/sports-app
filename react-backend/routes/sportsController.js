import express from 'express';
import { ObjectId } from 'mongodb';
import Sport from '../models/sport';

const router = express.Router();

//  base path: /sports

/* GET users listing. */
router.get('/all', (req, res) => {
  Sport.find({}).sort('date').exec((err, users) => {
    if (err) throw err;
    // console.log(users);
    res.json(users);
  });
});

router.put('/add', (req, res) => {
  const activity = new Sport({
    name: req.body.activityName,
    date: req.body.date,
    duration: req.body.duration,
    comments: req.body.comments,
  });

  activity.save((err) => {
    if (err) res.sendStatus(500);
    res.sendStatus(200);
  });
});


router.put('/update', (req, res) => {
  Sport.findOneAndUpdate({ _id: req.body.id }, { comments: req.body.comments }, (err, sport) => {
    if (err) res.sendStatus(500);
    res.sendStatus(200);
  });
});


router.delete('/delete/:_id', (req, res) => {
  Sport.remove({ _id: req.params._id}, (err) => {
    if (err) res.sendStatus(500);
    res.sendStatus(200);
  })
});

export default router;
