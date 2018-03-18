import express from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../utils/token';
import User from '../models/user';

const router = express.Router();

function generateToken(user) {
  const u = {
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    _id: user._id.toString(),
  };
  return jwt.sign(u, process.env.JWT_TOKEN, {
    expiresIn: 60 * 60 * 24
  });
}

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
          const token = generateToken(user);
          res.json({ user, token });
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
      // req.session.userId = user._id;
      // console.log('login');
      const token = generateToken(user);
      res.json({ user, token });
    }
  });
});

router.get('/authenticate', (req, res) => {
  if (verifyToken(req.headers['authorization']) === undefined) {
    res.sendStatus(500);
  } else {
    console.log('valid token');
    res.sendStatus(200);
  }
});

export default router;
