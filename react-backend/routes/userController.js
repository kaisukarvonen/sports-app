import express from 'express';
import User from '../models/user';

const router = express.Router();

// base path /user

router.put('/register', (req, res) => {
  User.find({"username": req.body.username }).exec((err, users) => {
    if (err) throw err;
    // console.log(users);
    if (users.count > 0) {
      res.sendStatus(500);
    } else {
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
      });
      console.log(req.body);
      user.save((error) => {
        if (error) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});


router.put('/login', (req, res) => {
  User.authenticate(req.body.username, req.body.password, (error, user) => {
    if (error || !user) {
      res.sendStatus(500);
    } else {
      req.session.userId = user._id;
      console.log('login');
      res.sendStatus(200);
    }
  });
});

router.get('/authenticate', (req, res) => {
  if (req.session && req.session.userId) {
    console.log('is logged in');
    res.sendStatus(200);
  } else {
    console.log('not logged in');
    res.sendStatus(500);
  }
});

router.get('/logout', (req, res) => {
  if (req.session) {
    // delete session object
    console.log('destroy');
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
