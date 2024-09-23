const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const User = require("./../models/userSchema");
const AppError = require("../utils/appError");

// Sign Token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Sign Up User
exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
  });
});

// Log In User
exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // throw error if email or password is not provided
  if (!email || !password)
    return next(new AppError("Please provide email and password!", 400));

  // 2) get user from email and password
  const user = await User.findOne({ email }).select("+password");

  // 3) check if user password and the stored password is same
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError("Incorrect Email or Password!", 401));

  //send token
  const token = signToken(user._id);

  res.status(201).json({
    status: "success",
    token,
  });
});

// exports.protect = catchAsync(async (req, res, next) => {
//   res.status(201).json({
//     status: "success",
//   });
// });
