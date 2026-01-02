const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mainRouter = require("./routers/mainRouter")

dotenv.config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use('/api', mainRouter);

module.exports = app;
