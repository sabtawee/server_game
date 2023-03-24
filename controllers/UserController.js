const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getLogin = async (req, res) => {
  try {
    const result = await prisma.login.findMany();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getLoginById = async (req, res) => {
  try {
    const { account_id } = req.params;
    const result = await prisma.login.findUnique({
      where: {
        account_id: parseInt(account_id),
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createLogin = async (req, res) => {
  try {
    let userid = req.body.userid;
    let user_pass = req.body.user_pass;
    let email = req.body.email;
    let birthdate = req.body.birthdate;
    const result = await prisma.login.create({
      data: {
        userid: userid,
        user_pass: user_pass,
        email: email,
        birthdate: new Date(`${birthdate}`).toISOString(),
      },
    });
    res.status(201).json({ message: "Created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const userLogin = async (req, res) => {
  try {
    let userid = req.body.userid;
    let user_pass = req.body.user_pass;
    const result = await prisma.login.findUnique({
      where: {
        userid: userid,
        user_pass: user_pass,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const userChangePassword = async (req, res) => {
  try {
    let userid = req.body.userid;
    let user_pass = req.body.user_pass;
    let new_pass = req.body.new_pass;
    const result = await prisma.login.update({
      where: {
        userid: userid,
        user_pass: user_pass,
      },
      data: {
        user_pass: new_pass,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getLogin,
  getLoginById,
  createLogin,
  userLogin,
  userChangePassword,
};
