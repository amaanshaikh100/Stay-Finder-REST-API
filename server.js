const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Handle Rejected Promises Globally
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! 💣 Shutting down...");

  server.close(() => {
    process.exit(1);
  });
});

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

// Connecting to Mongoose
async function main() {
  const connection = await mongoose.connect(DB);
  console.log("DB Connection Successful");
}

main();

// Runs the Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, (req, res) => {
  console.log(`LISTENING ON PORT ${PORT}`);
});

// Handle Rejected Promises Globally
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! 💣 Shutting down...");

  server.close(() => {
    process.exit(1);
  });
});
