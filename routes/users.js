const express = require("express");
const router = express.Router();
const UserModel = require("../models/users");
const bcrypt = require("bcrypt");
const passwordCheck = require("../utils/passwordCheck");

router.get("/", async (req, res) => {
  const user = await UserModel.findAll();
  res.status(200).json({
    data: user,
    metadata: "test user endpoint",
  });
});

router.post("/", async (req, res) => {
  const { nip, nama, password } = req.body;
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);

    const users = await UserModel.create({
      nip,
      nama,
      password: encryptedPassword,
    });
    res.status(200).json({
      registered: users,
      metadata: "test user endpoint",
    });
  } catch (error) {
    res.status(400).json({
      error: "data invalid",
    });
  }
});

router.put("/", async (req, res) => {
  const { nip, nama, password, passwordBaru } = req.body;
  try {
    const check = await passwordCheck(nip, password);

    const encryptedPassword = await bcrypt.hash(passwordBaru, 10);

    if (check.compare === true) {
      const users = await UserModel.update(
        {
          nama,
          password: encryptedPassword,
        },
        { where: { nip: nip } }
      );
      res.status(200).json({
        data: { updated: users[0] },
        metadata: "User updated",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "data invalid",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteduser = await UserModel.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(deleteduser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { noAdmin, password } = req.body;

  try {
    const check = await passwordCheck(noAdmin, password);
    if (check.compare === true) {
      res.json({
        users: check.userData,
        metadata: "Login success",
      });
    }
  } catch (e) {
    res.status(400).json({
      e: "something error",
    });
  }
});

module.exports = router;
