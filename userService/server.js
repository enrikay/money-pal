const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./src/config/db");

const app = express();

//import routes
const authRoute = require("./src/routes/authRoute");
const userRoute = require("./src/routes/userRoute");

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


//Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("Hello world");
});

connectDB();
app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);

module.exports = app