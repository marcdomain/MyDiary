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
   * @param {object} request object
   * @param {object} response object
   * @param {function} next - Calls the next route handler
   * @returns {object} JSON object representing failure message
   * @memberof UserAuthHandler
   */
  static signupValidator(request, response, next) {
    let {
      name, username, email, password
    } = request.body;

    if (name === undefined) {
      return response.status(406)
        .json({
          status: 'error',
          message: 'You have made no input for name',
        });
    }
    if (name.trim() === '') {
      return response.status(406)
        .json({
          status: 'error',
          message: 'name field cannot be empty',
        });
    }

    name = name.trim();
    if (name.length < 5 || name.length > 50) {
      return response.status(406)
        .json({
          status: 'error',
          message: 'name should be 5 to 50 characters long',
        });
    }

    const nameValidCharacters = /^[a-z ]+$/i;
    if (!nameValidCharacters.test(name)) {
      return response.status(406)
        .json({
          status: 'error',
          message: 'name can only contain alphabets and whitespace',
        });
    }

    if (username === undefined) {
      return response.status(406)
        .json({
          status: 'error',
          message: 'You have made no input for username',
        });
    }
    if (username.trim() === '') {
      return response.status(406)
        .json({
          status: 'error',
          message: 'Username field cannot be empty',
        });
    }
    username = username.toLowerCase().trim();

    if (username.length < 2 || username.length > 25) {
      return response.status(406)
        .json({
          status: 'error',
          message: 'username should be 2 to 25 characters long',
        });
    }
    if (username.includes(' ')) {
      return response.status(406)
        .json({
          status: 'error',
          message: 'Remove whitespace from your username',
        });
    }

    const alphaNumeric = /^[a-z0-9]+$/i;
    if (!alphaNumeric.test(username)) {
      return response.status(406)
        .json({
          status: 'error',
          message: 'Only Alphanumeric charaters are allowed for username',
        });
    }

    pool.query('select username from users where username = $1', [username])
      .then((result) => {
        if (result.rowCount !== 0) {
          return response.status(409)
            .json({
              status: 'error',
              message: 'Username taken! Login if it is yours or signup with a new username',
            });
        }
        request.body.username = username;
      })
      .catch((error) => {
        response.status(500)
          .json({
            status: 'error',
            message: error.message
          });
      });

    if (email === undefined) {
      return response.status(406)
        .json({
          status: 'error',
          message: 'You have made no input for email',
        });
    }
    if (email.trim() === '') {
      return response.status(406)
        .json({
          status: 'error',
          message: 'Email field cannot be empty',
        });
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return response.status(406)
        .json({
          status: 'error',
          message: 'Your email format is invalid',
        });
    }
    email = email.toLowerCase().trim();
    if (email.length < 10 || email.length > 50) {
      return response.status(406)
        .json({
          status: 'error',
          message: 'Your email should be 10 to 50 characters long'
        });
    }
    pool.query('select email from users where email = $1', [email])
      .then((result1) => {
        if (result1.rowCount !== 0) {
          return response.status(409)
            .json({
              status: 'error',
              message: 'Email taken! Login if it is yours or signup with a new email',
            });
        }
        request.body.email = email;
      })
      .catch((error) => {
        response.status(500)
          .json({
            status: 'error',
            message: error.message
          });
      });

    if (password === undefined) {
      return response.status(406)
        .json({
          status: 'error',
          message: 'You have made no input for password',
        });
    }
    if (password.trim() === '') {
      return response.status(406)
        .json({
          status: 'error',
          message: 'Password field cannot be empty',
        });
    }

    password = password.trim();

    if (password.length < 4 || password.length > 16) {
      return response.status(406)
        .json({
          status: 'error',
          message: 'Password should be 4 to 16 characters long',
        });
    }
    if (password.includes(' ')) {
      return response.status(406)
        .json({
          status: 'error',
          message: 'Remove whitespace from your password',
        });
    }
    next();
  }

  static signinValidator(request, response, next) {
  /*
   * Signin user to the application
   *
   * @param {object} request object
   * @param {object} response object
   * @param {function} next - Calls the next route handler
   * @returns {object} JSON object representing failure message
   * @memberof UserAuthHandler
   */
    let { username, password } = request.body;
    if (username === undefined) {
      return response.status(406)
        .json({
          status: 'error',
          message: 'You have made no input for username',
        });
    }
    username = username.toLowerCase().trim();
    if (username === '') {
      return response.status(406)
        .json({
          message: 'username field cannot be empty',
        });
    }
    pool.query('select username from users where username = $1', [username])
      .then((result) => {
        if (result.rowCount === 0) {
          return response.status(404)
            .json({
              status: 'error',
              message: 'User not found. Please signup',
            });
        }
      })
      .catch(() => {
        response.status(500);
      });
    if (password === undefined) {
      return response.status(406)
        .json({
          status: 'error',
          message: 'You have made no input for password',
        });
    }

    password = password.trim();
    if (password === '') {
      return response.status(406)
        .json({
          status: 'error',
          message: 'password field cannot be empty',
        });
    }

    request.body.password = password;
    request.body.username = username;
    next();
  }
}
export default UserAuthHandler;
