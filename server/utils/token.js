import jwt from 'jsonwebtoken';
import { JWT_TOKEN } from '../config';

export function verifyToken(headerToken) {
  let token = headerToken.replace('Bearer ', '');
  let loggedUser = undefined;
  jwt.verify(token, JWT_TOKEN, function(err, user) {
    if (!err) {
      loggedUser = user;
    }
  });
  return loggedUser;
}
