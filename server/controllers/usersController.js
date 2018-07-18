import users from '../dummyModels/users';

class UserAuthHandler{

  static userSignUp(req, res){
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
      })
  }

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
