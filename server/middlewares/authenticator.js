// An idea from codeforgeek https://codeforgeek.com/2018/03/refresh-token-jwt-nodejs-authentication/

import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default {

  generateToken(authUser) {
    const token = jwt.sign({ authUser }, process.env.KEYCODE, { expiresIn: '1200s' });
    return token;
  }
};
