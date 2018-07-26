import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from './connect';

/*
 * Class representing User Auth Handler
 *
 * @class UserAuthHandler
 */

class UserAuthHandler {
  /*
   * Signup user to the application
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} JSON object representing the error or success message
   * @memberof UserHandler
   */
  static userSignup(req, res) {
    const sql = 'insert into users (name, username, email, password) values ($1, $2, $3, $4)';
    const params = [
      req.body.name,
      req.body.username,
      req.body.email,
      bcrypt.hashSync(req.body.password, 10),
    ];
    pool.query(sql, params)
      .then(() => {
        const newUser = [{
          name: params[0],
          username: params[1],
          email: params[2],
          password: params[3]
        }];
        return jwt.sign({ newUser }, 'secretKey', { expiresIn: '1200s' }, (err, token) => {
          res.status(201)
            .json({
              message: `Contratulations ${params[1]}, signup was successful`,
              yourToken: token
            });
        });
      })
      .catch((err) => {
        res.json({
          error: err.message,
          message: 'something went wrong',
        });
      });
  } // End userSignup

  /*
   * Signin user
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} JSON object representing success message
   * @memberof UserHandler
   */
  static userSignin(req, res) {
    const { foundUser } = req.body;
    return res.status(200)
      .json({
        message: `Welcome ${foundUser.username}!`,
      });
  }
}

export default UserAuthHandler;
