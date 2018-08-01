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
   * @param {object} request object
   * @param {object} response object
   * @returns {object} JSON object representing the error or success message
   * @memberof UserHandler
   */
  static userSignup(request, result) {
    const params = [
      request.body.name,
      request.body.username,
      request.body.email,
      bcrypt.hashSync(request.body.password, 10),
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
        result.status(201)
          .json({
            message: `Congratulations ${params[1]} signup was successful`,
            yourToken: token
          });
      })
      .catch((error) => {
        result.json({
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
        }
        if (result.rowCount === 0) {
          response.status(404)
            .json({
              message: 'User not found. Please signup',
            });
        }
        return response.status(401)
          .json({
            message: 'Incorrect password',
          });
      })
      .catch((error) => {
        response.json({
          message: error.message,
        });
      });
  } // End userSignin
}

export default UserAuthHandler;
