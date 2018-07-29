// An idea from codeforgeek https://codeforgeek.com/2018/03/refresh-token-jwt-nodejs-authentication/

import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default {

  generateToken(authUser) {
    const token = jwt.sign({ authUser }, process.env.KEYCODE, { expiresIn: '1200s' });
    return token;
  },

  verifyToken(req, res, next) {
    const token = req.headers.authorization || req.body.token || req.query.token;
    if (token === undefined) {
      res.status(403)
        .json({
          message: 'No token supplied',
        });
    } else {
      jwt.verify(token, process.env.KEYCODE, (err, authData) => {
        if (err) {
          if (err.message.includes('signature')) {
            res.status(403)
              .json({
                message: 'Invalid token supplied',
              });
          } else {
            res.status(403)
              .json({
                message: err,
              });
          }
        }
        req.authData = authData;
        return next();
      });
    }
  }
};
