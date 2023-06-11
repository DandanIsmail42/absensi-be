const bcrypt = require("bcrypt");
const userModel = require("../models/users");

const passwordCheck = async (nip, password) => {
  const userData = await userModel.findOne({ where: { nip } });
  const compare = await bcrypt.compare(password, userData.password);
  return { compare, userData };
};

module.exports = passwordCheck;
