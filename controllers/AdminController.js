const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const JWT = require("jsonwebtoken");
const secret = process.env.SECRET;

const AdminLogin = async (req, res) => {
  try {
    console.log(req.body);
    let userid = req.body.username;
    let user_pass = req.body.password;
    const admin = await prisma.login.findMany({
      where: {
        userid: userid,
        user_pass: user_pass,
      },
    });
    if (admin.length == 0) {
      res.status(400).json({
        message: "Invalid username or password",
      });
      return;
    }
    if (admin[0].group_id != 99) {
      res.status(400).json({
        message: "Invalid Admin",
      });
      return;
    }
    const token = JWT.sign(
      {
        email: admin[0].email,
        userid: admin[0].userid,
      },
      secret,
      { expiresIn: "1h" }
    );

    let body = {
      userid: admin[0].userid,
      email: admin[0].email,
    };
    res.status(200).json({
      token: token,
      user: body,
      message: "Login Success",
    });
  } catch (error) {
    console.log(error);
  }
};

const Authen = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = JWT.verify(token, secret);
    if (decoded) {
      const user = await prisma.login.findMany({
        where: {
          userid: decoded.userid,
          email: decoded.email,
        },
      });
      console.log(user[0].userid);
      if (user) {
        res.status(200).json({
          message: "Authen Success",
          userid: user[0].userid,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Authen Failed",
    });
  }
};

module.exports = {
  AdminLogin,
  Authen,
};
