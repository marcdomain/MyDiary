import users from '../dummyModels/users';

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
   * @returns {object} JSON object representing the user info and success message
   * @memberof UserHandler
   */
  static userSignUp(req, res) {
    const newUser = {
      id: users.length + 1,
      fullName: req.body.fullName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    users.push(newUser);
    return res.status(201)
      .json({
        newUser,
        message: 'Signup was successful',
      });
  }

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
    if (foundUser && foundUser.password === req.body.password) {
      return res.status(200)
        .json({
          message: `Welcome ${foundUser.username}!`,
        });
    }
  }
}

export default UserAuthHandler;
