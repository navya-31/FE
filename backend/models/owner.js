import mongoose from "mongoose";

const ownerSchema = mongoose.Schema({
  user_id: String,
  hotel_id: String,
  hotel_name: String,
});

const ownerModel = mongoose.model("ownerModel", ownerSchema);

export default ownerModel;
