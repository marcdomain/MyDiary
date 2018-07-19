import users from '../dummyModels/users';

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
      fullName, username, email, password
    } = req.body;

    if (fullName === undefined) {
      return res.status(406)
        .json({
          message: 'You have made no input for fullName',
        });
    }
    if (fullName === '') {
      return res.status(406)
        .json({
          message: 'fullName field cannot be empty',
        });
    }

    fullName = fullName.trim();
    if (fullName.length < 5 || fullName.length > 25) {
      return res.status(406)
        .json({
          message: 'fullName should be 5 to 25 characters long',
        });
    }

    const fullNameValidCharacters = /^[a-z ]+$/i;
    if (!fullNameValidCharacters.test(fullName)) {
      return res.status(406)
        .json({
          message: 'fullName can only contain alphabets and whitespace',
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
    username = username.trim();
    username = username.toLowerCase();

    if (username.length < 2 || username.length > 15) {
      return res.status(406)
        .json({
          message: 'username should be 2 to 15 characters long',
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
    const foundUsername = users.find(user => user.username === username);
    if (foundUsername) {
      return res.status(409)
        .json({
          message: 'Username taken! Login if it is yours or sign up with a new username',
        });
    }

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
    if (!/^[a-zA-Z0-9._-]{2,}@[a-zA-Z]+\.[a-zA-Z]{2,5}(\.[a-zA-Z]{2,5})?$/.test(email)) {
      return res.status(406)
        .json({
          message: 'Your email format is invalid',
        });
    }
    email = email.trim();
    email = email.toLowerCase();
    if (email.length < 10 || email.length > 50) {
      return res.status(406)
        .json({
          message: 'Your email should be 10 to 50 characters long'
        });
    }

    const foundEmail = users.find(user => user.email === email);
    if (foundEmail) {
      return res.status(409)
        .json({
          message: 'Email taken! Login if it is yours or sign up with a new email',
        });
    }

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
    req.body.username = username;
    req.body.email = email;
    return next();
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
    username = username.trim();
    username = username.toLowerCase();
    const foundUser = users.find(user => user.username === username);
    if (!foundUser) {
      return res.status(401)
        .json({
          message: 'username does not exist. Input your correct username or Signup!',
        });
    }
    if (password === undefined) {
      return res.status(406)
        .json({
          message: 'You have made no input for password',
        });
    }
    if (password === '') {
      return res.status(406)
        .json({
          message: 'password field cannot be empty',
        });
    }

    password = password.trim();
    if (foundUser && password !== foundUser.password) {
      return res.status(401)
        .json({
          message: 'Incorrect password',
        });
    }

    req.body.foundUser = foundUser;
    req.body.password = password;
    return next();
  }
}
export default UserAuthHandler;
