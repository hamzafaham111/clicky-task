const mongoose = require("mongoose");
const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;
mongoose
  .connect(MONGODB_CONNECTION)
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => console.log(error));
