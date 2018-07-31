import bcrypt, { compareSync } from 'bcrypt';
import pool from '../db/connectDb';
import queries from '../db/dbQueries';
import auth from '../middlewares/authenticator';

const { generateToken } = auth;
const { insertIntoUsers, queryUsersByUsername } = queries;

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
    const params = [
      req.body.name,
      req.body.username,
      req.body.email,
      bcrypt.hashSync(req.body.password, 10),
    ];
    pool.query(insertIntoUsers, params)
      .then(() => {
        const authUser = [{
          name: params[0],
          username: params[1],
          email: params[2],
          password: params[3]
        }];
        const token = generateToken(authUser);
        res.status(201)
          .json({
            message: `Congratulations ${params[1]} signup was successful`,
            yourToken: token
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
   * @returns {object} JSON object representing response message
   * @memberof UserHandler
   */
  static userSignin(req, res) {
    const params = [req.body.username];
    pool.query(queryUsersByUsername, params)
      .then((result) => {
        if (result.rowCount !== 0) {
          const compHash = compareSync(req.body.password, result.rows[0].password);
          if (compHash) {
            const authUser = result.rows;
            const token = generateToken(authUser);
            res.status(200)
              .json({
                message: `Welcome back ${params[0]}`,
                yourToken: token
              });
          }
        }
        if (result.rowCount === 0) {
          res.status(404)
            .json({
              message: 'User not found. Please signup',
            });
        }
        return res.status(401)
          .json({
            message: 'Incorrect password',
          });
      })
      .catch((err) => {
        res.json({
          message: err.message,
        });
      });
  } // End userSignin
}

export default UserAuthHandler;
