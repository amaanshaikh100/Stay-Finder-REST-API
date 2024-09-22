const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoutes");
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// Routes
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(
    new AppError(`Cannot find the URL ${req.originalUrl} on this server!`, 404)
  );
});

module.exports = app;
