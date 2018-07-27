// idea from Traversy Media tutorial https://www.youtube.com/watch?v=7nafaH9SddU
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    req.token = bearerHeader;
    next();
  } else {
    res.status(403)
      .json({
        message: 'no token recieved, please supply a valid token',
      });
  }
};

export default verifyToken;
