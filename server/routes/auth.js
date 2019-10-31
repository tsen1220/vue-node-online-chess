const router = require("express").Router();
const mongoose = require("mongoose");

//models
const userSchema = require("../models/user");
const User = mongoose.model("chessUser", userSchema);

//VALIDATION
const { registerValidation, loginValidation } = require("../validation");

//Hash pwd
const bcrypt = require("bcryptjs");

//jwt token
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  //Validate the data
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //Check user who is in the db
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("Email already exists");
  }

  //Hash passwords

  const salt = await bcrypt.genSalt(10);
  const hashpwd = await bcrypt.hash(req.body.password, salt);

  //insert data structure
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashpwd
  });

  //save data and response
  try {
    const savedUser = await user.save();
    res.send(user._id);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  //Validate the data
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //Check user who is in the db
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Email or password is wrong.");
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send("Invalid password");
  }

  //Create and assign token and useridname
  const username = user.name;
  const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
  res
    .header("auth-token", { token: token, userid: username })
    .send({ token: token, userid: username });
});

module.exports = router;
