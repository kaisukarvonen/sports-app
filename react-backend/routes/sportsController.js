import express from 'express';
import { ObjectId } from 'mongodb';
import Sport from '../models/sport';

const router = express.Router();

//  base path: /sports

/* GET users listing. */
router.get('/all', (req, res) => {
  Sport.find({}, (err, users) => {
    if (err) throw err;
    // console.log(users);
    res.json(users);
  });
});

router.put('/add', (req, res) => {
  // const activity = new Sport({
  //   _id: new ObjectId(),
  //   name: 'Testiurheilu2',
  //   date: new Date(),
  //   duration: 3,
  //   comments: 'Jalkatreeni',
  // });

  activity.save((err) => {
    if (err) throw err;

    console.log('Sport saved!');
  });
});


router.delete('/delete/:_id', (req, res) => {
  Sport.remove({ _id: req.params._id}, (err) => {
    if (err) throw err;
    res.sendStatus(200);
  })
});

export default router;
