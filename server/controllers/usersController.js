import users from '../dummyModels/users';

class UserAuthHandler{

  static userSignUp(req, res){
    const {
        fullName, username, email, password,
    } = req.body;
    const id = users.length + 1;
    const newUser = {
      id,
      fullName,
      username,
      email,
      password,
    };
    users.push(newUser);
    return res.status(201)
      .json({
        newUser,
        message: 'Signup was successful',
      })
  }

  static userSignin(req, res) {
    const { username, password } = req.body;
    const foundUser = users.find(user => user.username === username);
    if (foundUser) {
      if (username === foundUser.username
        && foundUser.password === password) {
        return res.status(200)
          .json({
            message: `Welcome '${foundUser.username}'!`,
          });
      }
      return res.status(401)
        .json({
          message: 'Incorrect password',
        });
    }
    return res.status(401)
      .json({
        message: 'username does not exist. Input your correct username or Signup!',
      });
  }

}

export default UserAuthHandler;
