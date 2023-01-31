const app = require("./app");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`Shutting down server due to uncaught exception`);
  process.exit(1);
});

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT || 4000, () => {
  console.log(
    `Server start in ${process.env.PORT || 4000} in ${
      process.env.NODE_ENV || 4000
    } mode.`
  );
});

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promice rejection`);
  server.close(() => {
    process.exit(1);
  });
});
