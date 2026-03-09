const User = require("../models/userModel.js")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../utils/config");

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "3d",
  });
};

const signupUser = async (req, res) => {
  const {
    name,
    email,
    password,
    phoneNumber,
    gender,
    dateOfBirth,
    profilePicture,
    role,
    address
  } = req.body;
  console.log(address)
  try {
    if (
      !name ||
      !email ||
      !password ||
      !phoneNumber ||
      !gender ||
      !dateOfBirth ||
      !profilePicture ||
      !role ||
      !address
    ) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      gender,
      dateOfBirth,
      profilePicture,
      role,
      address
    });

    if (user) {
      // console.log(user._id);
      const token = generateToken(user._id);
      res.status(201).json({ email, token });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);
      res.status(200).json({ email, token });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  signupUser,
  loginUser,
};
