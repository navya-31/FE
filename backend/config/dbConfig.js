const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
db.on("connected", () => {
  console.log("MongoDB Connection Successful");
});
db.on("error", () => {
  console.log("MongoDB Connection Failed");
});
