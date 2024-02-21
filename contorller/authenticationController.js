const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRESIN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    secure: true,
    httpOnly: true,
  });

  user.password = undefined;

  res.redirect("/");
};

exports.user = async (req, res, next) => {
  try {
    const user = await User.create({
      user: process.env.USERNAME,
      password: process.env.SINGIN_PASSWORD,
    });
    res.send("successfull");
  } catch {
    console.log("error in creating user ");
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//login page =>  GET

exports.login = (req, res) => {
  res.render("login/login", { layout: false });
};

exports.logins = async (req, res, next) => {
  const { user, password } = req.body;

  if (!user || !password) {
    //need to send error
    return res.redirect("/");
  }

  const userme = await User.findOne({ user }).select("+password");

  if (!userme || !(await userme.correctPassword(password, userme.password))) {
    //send some error
    return res.redirect("/");
  }
  createSendToken(userme, 200, res);
};

exports.loggedin = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decode = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.SECRET_KEY
      );

      res.user = decode;
      res.locals.user = decode;

      return next();
    } catch (err) {
      console.log("error in jwt cookie");
    }
  }
  next();
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.redirect("/");
};

exports.protect = async (req, res, next) => {
  let token;
  try {
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      //redirecting to the no permission page
      return res.render("partials/forbiddenerror", { layout: false });
    }

    const decode = await promisify(jwt.verify)(token, process.env.SECRET_KEY);

    const currentUser = await User.findById(decode.id);
    if (!currentUser) {
      //render to the you are not authorized page
      return res.send("you are not authorized 2");
    }
    res.locals.user = currentUser;
    return next();
  } catch (err) {
    console.log("error occured", err);
    return next();
  }
};
