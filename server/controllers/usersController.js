import bcrypt, { compareSync } from 'bcrypt';
import pool from '../db/connectDb';
import { insertIntoUsers, queryUsersByUsername } from '../db/dbQueries';
import { generateToken } from '../middlewares/authenticator';

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
   * @param {object} request object
   * @param {object} response object
   * @returns {object} JSON object representing the error or success message
   * @memberof UserHandler
   */
  static userSignup(request, response) {
    const params = [
      request.body.name,
      request.body.username,
      request.body.email,
      bcrypt.hashSync(request.body.password, 10),
    ];
    pool.query(insertIntoUsers, params)
      .then((result) => {
        const authUser = result.rows;
        const token = generateToken(authUser);
        response.status(201)
          .json({
            message: `Congratulations ${params[1]}! Signup was successful`,
            authUser,
            yourToken: token
          });
      })
      .catch((error) => {
        response.json({
          error: error.message,
          message: 'something went wrong',
        });
      });
  } // End userSignup

  /*
   * Signin user
   *
   * @static
   * @param {object} request object
   * @param {object} response object
   * @returns {object} JSON object representing response message
   * @memberof UserHandler
   */
  static userSignin(request, response) {
    const params = [request.body.username];
    pool.query(queryUsersByUsername, params)
      .then((result) => {
        if (result.rowCount !== 0) {
          const compHash = compareSync(request.body.password, result.rows[0].password);
          if (compHash) {
            const authUser = result.rows;
            const token = generateToken(authUser);
            response.status(200)
              .json({
                message: `Welcome back ${params[0]}`,
                yourToken: token
              });
          }
          response.status(401)
            .json({
              status: 'error',
              message: 'Incorrect password',
            });
        }
        if (result.rowCount === 0) {
          response.status(404)
            .json({
              status: 'error',
              message: 'User not found. Please signup',
            });
        }
      })
      .catch((error) => {
        response.json({
          status: 'error',
          message: error.message,
        });
      });
  } // End userSignin
}

export default UserAuthHandler;
