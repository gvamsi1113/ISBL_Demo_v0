const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("../JWT");

router.post("/reg", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    // Try to create the user
    await Users.create({
      username: username,
      password: hash,
    });

    res.json("USER REGISTERED");
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      // Handle the case where the username already exists without revealing sensitive details
      res.status(400).json({ error: "Username already exists" });
    } else {
      // Handle other errors with a generic message
      console.error("Error:", err); // Log the error for debugging, but don't reveal it to the client
      res.status(500).json({ error: "An error occurred during registration" });
    }
  }
});


router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    // Send an error response if the user doesn't exist
    return res.status(401).json({ error: "User Doesn't Exist" });
  }


  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
     
      return res.status(401).json({ error: "Wrong Username And Password Combination" });
  }
  else {
    const accessToken = createTokens(user);
    
    console.log(user.username)
    res.cookie("access-token", accessToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
      httpOnly: true,
      // sameSite: "none"
    });
    
    res.send({"access-token":accessToken, "username": user.username, "role": user.role});


  }
  });
});




router.get("/dashboard", validateToken, async (req, res) => {
  // Accessing the user ID from the req object
  const userId = req.userId;

  // Check the user's role
  const user = await Users.findByPk(userId);

  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  if (user.role >= 1) {
  
    res.send({ id: user.id, username: user.username , role : user.role});
  } else {
    // User does not have role 2, redirect to another page
    res.redirect("/logout");
  }
});


router.post("/logout",validateToken, (req, res) => {
  
  res.clearCookie("access-token");
  res.json({ message: "Logged out successfully" });
});


router.post("/reg-admin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    // Try to create the user
    await Users.create({
      username: username,
      password: hash,
      role: 2
    });

    res.json("USER REGISTERED");
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      // Handle the case where the username already exists without revealing sensitive details
      res.status(400).json({ error: "Username already exists" });
    } else {
      // Handle other errors with a generic message
      console.error("Error:", err); // Log the error for debugging, but don't reveal it to the client
      res.status(500).json({ error: "An error occurred during registration" });
    }
  }
});


router.post("/admin-login", async (req, res) => {
  const { username, password } = req.body;
  const userId = req.userId;
  // const user = await Users.findByPk(userId);

  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    // Send an error response if the user doesn't exist
    return res.status(401).json({ error: "User Doesn't Exist" });
  }
  else if (user.role < 2) {
    return res.status(401).json({ error: "Not Authorized only role higher than 2 is allowed to access this resource" });
  } 

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
     
      return res.status(401).json({ error: "Wrong Username And Password Combination" });
  }
  else {
    const accessToken = createTokens(user);

    res.cookie("access-token", accessToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
      httpOnly: true,
    });

    res.send({"access-token":accessToken, "username": user.username, "role": user.role});
  }
  });
});


router.get("/admin-dashboard", validateToken, async (req, res) => {
  // Accessing the user ID from the req object
  const userId = req.userId;

  // Check the user's role
  const user = await Users.findByPk(userId);

  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }
  else if (user.role < 2) {
    return res.status(401).json({ error: "Not Authorized only role higher than 2 is allowed to access this resource" });
  } 

  if (user.role === 2) {
    // User has role 2, allow access to the dashboard
    res.send({ id: user.id, username: user.username , role : user.role});
  } else {
    // User does not have role 2, redirect to another page
    res.redirect("/logout");
  }
});



module.exports = router;