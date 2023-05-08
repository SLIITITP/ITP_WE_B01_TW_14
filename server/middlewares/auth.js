const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    //Whenever we pass a token we pass it in the Bearer format(Bearerccjncnsnwocnccocfkfsax) so we split it and take the second part of the array which is the token itself.
    //We will get an array like this ["Bearer", "ccjncnsnwocnccocfkfsax"]
    //[1] will give us the token. Which is ccjncnsnwocnccocfkfsax.
    //[1] is the index of the array.

    //Now we will verify the token.
    //jwt.verify(token, secret, callback)
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      try {
        if (err) {
          return res.status(401).json({ error: "Unathorized!" });
          //if token is not valid then we will send an error.
        }
        //if token is valid then we will find the user in the database.
        //We will find the user by the id which is in the payload.
        const user = await User.findOne({ _id: payload._id }).select(
          "-password"
        );
        //-password means we will not send the password to the client.

        //Now we will add the user to the request object.
        //Basically we are adding the user to the request object so that we can use it in the routes.
        //Basically attaching the user to the req.user
        req.user = user;
        next(); //We will call next() so that the request can move to the next middleware or the route.
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    return res.status(403).json({ error: "Forbidden 🛑🛑" });
  }
};
