import express from 'express';
import mongoose from 'mongoose';
import Sport from '../models/sport';
import { verifyToken } from '../utils/token';

const router = express.Router();
//  base path: /sports

router.get('/all', (req, res) => {
  const user = verifyToken(req.headers['authorization']);
  Sport.find({"user_id": user._id }).sort('date').exec((err, sports) => {
    if (err) throw err;
    res.json(sports);
  });
});

router.put('/add', (req, res) => {
  const user = verifyToken(req.headers['authorization']);
  const activity = new Sport({
    name: req.body.activityName,
    date: req.body.date,
    duration: req.body.duration,
    comments: req.body.comments,
    user_id: user._id,
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
  Sport.remove({ _id: req.params._id }, (err) => {
    if (err) res.sendStatus(500);
    res.sendStatus(200);
  })
});

export default router;
