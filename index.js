const express = require("express");
const cors = require("cors");
const basicAuth = require("express-basic-auth");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const UserRouter = require("./routes/UserRouter");
const AdminRouter = require("./routes/AdminRouter");



dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "uplaods")));

// ตั้งค่าการอัปโหลดภาพ
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.originalname.split(".")[0] +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// ตั้งค่าการเข้าถึง API

const authBasic = basicAuth({
  users: { ApiKey: "hup91P^EveCq001ba@7aR6qOan5KWmH#96NW" },
  hallenge: true,
  unauthorizedResponse: (req) => {
    return req.auth
      ? "Credentials " + req.auth.user + ":" + req.auth.password + " rejected"
      : "No credentials provided";
  },
});

app.get("/", authBasic, (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", UserRouter);
app.use("/api/admin", AdminRouter);



const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Example API",
      description: "Example API for demonstration purposes",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3002",
        description: "Local server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(process.env.PORT, () => {
  console.log(`Server is Running at http://localhost:${process.env.PORT}`);
});
