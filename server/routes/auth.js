const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const auth = require("../middlewares/auth");
//integrating our user model
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  //<check all the missing fields>
  //status 400 is for Bad User Input
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ error: `Please enter all the required fields.` });

  //Name Validation
  if (name.length > 25)
    return res
      .status(400)
      .json({ error: `name should be less than 25 characters.` });

  //Emali Validation
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Regex means regular expression. It is a sequence of characters that define a search pattern. We use it to validate the email address.
  // The above regex is a very common one. It is used to validate email addresses. It is not perfect, but it is good enough for our purposes.
  // The regex is divided into 3 parts: ^, $ and the middle part.
  // The ^ and $ are used to match the beginning and end of the string. The middle part is used to match the email address.
  // The middle part is divided into 3 parts: ([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+")
  // The first part is used to match the email address before the @ symbol. It is divided into 2 parts: ([^<>()[\]\\.,;:\s@"]+) and (\.[^<>()[\]\\.,;:\s@"]+)*

  if (!emailReg.test(email))
    return res
      .status(400)
      .json({ error: `Please enter a valid email address.` });

  //Password Validation
  if (password.length <= 6)
    return res
      .status(400)
      .json({ error: `Password must be atleast 7 characters long.` });

  try {
    const doesUserAlreadyExist = await User.findOne({ email });

    if (doesUserAlreadyExist)
      return res
        .status(400)
        .json({
          error: `a user with that email [${email}] already exists. Please try again.`,
        });

    const hashedPassword = await bcrypt.hash(password, 12); //12 is the length of the salt Salt is a random string of characters that is added to the password before hashing. It is used to make the password more secure.

    const newUser = new User({ name, email, password: hashedPassword });

    //save the user
    const result = await newUser.save();

    //password won't be seen as plaintext
    result._doc.password = undefined;

    //201 means success
    //._doc defines name, email and password
    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ error: `Please enter all the required fields.` });

  //Email Validation
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailReg.test(email))
    return res
      .status(400)
      .json({ error: `Please enter a valid email address.` });

  try {
    const doesUserExist = await User.findOne({ email });

    if (!doesUserExist)
      return res.status(400).json({ error: "Invalid email or password." });

    //if there were any user present
    const doesPasswordMatch = await bcrypt.compare(
      password,
      doesUserExist.password
    );

    if (!doesPasswordMatch)
      return res.status(400).json({ error: "Invalid email or password." });

    //Now lets generate a token:

    const payload = { _id: doesUserExist._id }; //we are using the id of the user as the payload

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const user = { ...doesUserExist._doc, password: undefined };
    return res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

router.get("/me", auth, async (req, res) => {
  return res.status(200).json({ ...req.user._doc });
});

//to use this router in other files, we need to export it
module.exports = router;

//Extra Note
// Double quotes or single qoutes are just indicating string. But in first example there are not single quotes. It's a back-tick (` `) and it allows you to use embedded expression( in this case 'subject' parameter of your function).

//https://stackoverflow.com/questions/56750493/what-is-the-difference-between-and-in-js
