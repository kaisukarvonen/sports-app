import jwt from 'jsonwebtoken';

export function verifyToken(headerToken) {
  let token = headerToken.replace('Bearer ', '');
  let loggedUser = undefined;
  jwt.verify(token, process.env.JWT_TOKEN, function(err, user) {
    if (!err) {
      loggedUser = user;
    }
  });
  return loggedUser;
}
