import users from '../dummyModels/users';
import pool from '../db/connectDb';

/*
 * Class representing User Auth Validator
 *
 * @class UserAuthHandler
 */

class UserAuthHandler {
  /*
   * Signup new user to the application
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - Calls the next route handler
   * @returns {object} JSON object representing failure message
   * @memberof UserAuthHandler
   */
  static signupValidator(req, res, next) {
    let {
      name, username, email, password
    } = req.body;

    if (name === undefined) {
      return res.status(406)
        .json({
          message: 'You have made no input for name',
        });
    }
    if (name === '') {
      return res.status(406)
        .json({
          message: 'name field cannot be empty',
        });
    }

    name = name.trim();
    if (name.length < 5 || name.length > 50) {
      return res.status(406)
        .json({
          message: 'name should be 5 to 50 characters long',
        });
    }

    const nameValidCharacters = /^[a-z ]+$/i;
    if (!nameValidCharacters.test(name)) {
      return res.status(406)
        .json({
          message: 'name can only contain alphabets and whitespace',
        });
    }

    if (username === undefined) {
      return res.status(406)
        .json({
          message: 'You have made no input for username',
        });
    }
    if (username === '') {
      return res.status(406)
        .json({
          message: 'Username field cannot be empty',
        });
    }
    username = username.toLowerCase().trim();

    if (username.length < 2 || username.length > 25) {
      return res.status(406)
        .json({
          message: 'username should be 2 to 25 characters long',
        });
    }
    if (username.includes(' ')) {
      return res.status(406)
        .json({
          message: 'Remove whitespace from your username',
        });
    }

    const alphaNumeric = /^[a-z0-9]+$/i;
    if (!alphaNumeric.test(username)) {
      return res.status(406)
        .json({
          message: 'Only Alphanumeric charaters are allowed for username',
        });
    }

    pool.query('select username from users where username = $1', [username])
      .then((result) => {
        if (result.rowCount !== 0) {
          return res.status(409)
            .json({
              message: 'Username taken! Login if it is yours or signup with a new username',
            });
        }
        req.body.username = username;
      })
      .catch((err) => {
        res.status(500)
          .json({
            message: err.message
          });
      });

    if (email === undefined) {
      return res.status(406)
        .json({
          message: 'You have made no input for email',
        });
    }
    if (email === '') {
      return res.status(406)
        .json({
          message: 'Email field cannot be empty',
        });
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return res.status(406)
        .json({
          message: 'Your email format is invalid',
        });
    }
    email = email.toLowerCase().trim();
    if (email.length < 10 || email.length > 50) {
      return res.status(406)
        .json({
          message: 'Your email should be 10 to 50 characters long'
        });
    }
    pool.query('select email from users where email = $1', [email])
      .then((result1) => {
        if (result1.rowCount !== 0) {
          return res.status(409)
            .json({
              message: 'Email taken! Login if it is yours or signup with a new email',
            });
        }
        req.body.email = email;
      })
      .catch((err) => {
        res.status(500)
          .json({
            message: err.message
          });
      });

    if (password === undefined) {
      return res.status(406)
        .json({
          message: 'You have made no input for password',
        });
    }
    if (password === '') {
      return res.status(406)
        .json({
          message: 'Password field cannot be empty',
        });
    }

    password = password.trim();

    if (password.length < 4 || password.length > 16) {
      return res.status(406)
        .json({
          message: 'Password should be 4 to 16 characters long',
        });
    }
    if (password.includes(' ')) {
      return res.status(406)
        .json({
          message: 'Remove whitespace from your password',
        });
    }
    next();
  }

  static signinValidator(req, res, next) {
  /*
   * Signin user to the application
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - Calls the next route handler
   * @returns {object} JSON object representing failure message
   * @memberof UserAuthHandler
   */
    let { username, password } = req.body;
    if (username === undefined) {
      return res.status(406)
        .json({
          message: 'You have made no input for username',
        });
    }
    if (username === '') {
      return res.status(406)
        .json({
          message: 'username field cannot be empty',
        });
    }
    username = username.toLowerCase().trim();
    
  }
}
export default UserAuthHandler;
