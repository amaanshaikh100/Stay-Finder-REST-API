const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// Routes
app.use("/api/v1/users", userRouter);

module.exports = app;
