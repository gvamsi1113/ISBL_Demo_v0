const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000", // Replace with the origin of your React app
  credentials: true,
};

app.use(cors(corsOptions));
// app.use(cors());
app.use(cookieParser());

const db = require("./models");


const usersRouter = require("./routes/users");
app.use("/auth", usersRouter);




db.sequelize.sync().then(() => {
    app.listen(3001, () => {
      console.log("Server running on port 3001");
    });
  });