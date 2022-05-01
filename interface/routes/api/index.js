// API for logging in
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcyrpt = require("bcryptjs");
const userController = require("../../controllers/users.controller");
const { verifyJWT } = require("../../functions");

router.get("/verify", (req, res) => {
  // get token from auth header
  console.log(req.headers)
  const token = req.headers.authorization;
  // verify token
  const decoded = verifyJWT(token.replace("Bearer ", ""));
  if (decoded) {
    res.status(200).json({
      message: "Token is valid",
      decoded: decoded,
    });
  } else {
    res.status(401).json({
      message: "Token is invalid",
    });
  }
});

router.post("/create", (req, res) => {
  const { username, password } = req.body;
  const saltRounds = 10;
  const hash = bcyrpt.hashSync(password, saltRounds);
  userController.create(username, hash).then((user) => {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      token,
      user,
    });
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // get user by username
  userController.findByUsername(username).then((user) => {
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    // check if password is correct
    bcyrpt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }
      // generate jwt
      const payload = {
        id: user.id,
        username: user.username,
      };
      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
          });
        }
      );
    });
  });
});

module.exports = router;
