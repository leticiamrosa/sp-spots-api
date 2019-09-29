const express = require("express");
const jwt = require("jsonwebtoken"); // auth
const bcrypt = require("bcryptjs");
const authConfig = require("../../config/auth");

const User = require("../../models/user");

// generation token
function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  });
}

module.exports = {
  async create(req, res) {
    const { email, name, password } = req.body;

    try {
      if (await User.findOne({ email })) {
        return res.status(400).send({ error: "User already exists" });
      }

      // pass all params for request in body
      const user = await User.create({ name, email, password });

      user.password = undefined;

      return res.send({
        user,
        token: generateToken({ id: user.id })
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: "Registration Failed" });
    }
  },

  async auth(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return res.status(400).send({ error: "User not found" });
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).send({ error: "Invalid password" });
      }

      user.password = undefined;

      return res.send({
        user,
        token: generateToken({ id: user.id })
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: "Auth Failed" });
    }
  },

  async resetPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).send({ error: "User not found" });
      }
    } catch (err) {
      res.status(400).send({ error: "Erro on forgot password, try again" });
    }
  }
};
