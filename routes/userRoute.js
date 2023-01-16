const express = require("express");
const jwt = require("jsonwebtoken");
const brcypt = require("bcrypt");
const router = express.Router();
const User = require("../models/userModel");
const {
  validatName,
  validatEmail,
  validatePassword,
  validateEmail,
  validateName,
} = require("../utlis/validators");

router.post("/signup", async (req, res) => {
  try {
    console.log("made to try");
    const { name, email, password, isSeller } = req.body;

    const existigUser = await User.findOne({
      where: { email: email },
    });
    if (existigUser) {
      return res.status(403).json({ err: "User already Exits" });
    }
    if (!validateName(name)) {
      return res.status(400).json({ err: "Name validate fails" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ err: "email validate fails" });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ err: "Password validate fails" });
    }
    const hashedPassword = await brcypt.hash(password, (saltOrRounds = 10));

    const user = {
      email,
      name,
      password: hashedPassword,
      isSeller: isSeller || false,
    };

    const createdUser = await User.create(user);

    console.log(createdUser);
    return res.status(201).json({
      message: `welcome ${createdUser.name}`,
    });
  } catch (error) {
    console.log("made to catch");
    return res.status(500).send(error);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email.length === 0) {
      return res.status(400).json({ err: "Please provide email" });
    }
    if (password.length === 0) {
      return res.status(400).json({ err: "Please provide password" });
    }
    const existigUser = await User.findOne({
      where: { email },
    });
    if (!existigUser) {
      return res.status(404).json({ err: "User not found" });
    }
    const passwordMatch = await brcypt.compare(password, existigUser.password);

    if (!passwordMatch) {
      return res.status(400).json({ err: "Password error" });
    }
    const payload = { user: { id: existigUser.id } };
    const bearerToken = jwt.sign(payload, "SECERT MESSAGGE", {
      expiresIn: 360000,
    });

    res.cookie("t", bearerToken, { expire: new Date() + 9999 });

    return res.status(200).json({
      bearerToken,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get('logout', async (req, res)=>{
  try {
    res.clearCookie('t')
    return res.status(200).json({message: "cookie deleted logout"})
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router;
