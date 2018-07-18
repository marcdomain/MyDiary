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
}

export default UserAuthHandler;
