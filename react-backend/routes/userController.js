import express from 'express';
import User from '../models/user';

const router = express.Router();

// base path /user

router.put('/register', (req, res) => {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
  });
  console.log(req.body);
  user.save((err) => {
    if (err) res.sendStatus(500);
    res.sendStatus(200);
  });
});


router.put('/login', (req, res) => {
  User.authenticate(req.body.username, req.body.password, (error, user) => {
    if (error || !user) {
      res.sendStatus(500);
    } else {
      req.session.userId = user._id;
      res.sendStatus(200);
    }
  });
});


router.get('/logout', (req, res) => {
  if (req.session) {
    // delete session object
    req.session.destroy((err) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  }
});

export default router;
