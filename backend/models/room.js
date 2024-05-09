import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
  room_number: String,
  hotel_id: { type: String, required: true },
  hotel_name: String,
  hotel_address: String,
  area: Number,
  rent: Number, // per month
  tenant_id: {
    type: String,
    default: "Unassigned",
  },
  next_vacancy_date: Date,
  type: String,
});

const roomModel = mongoose.model("roomModel", roomSchema);

export default roomModel;
