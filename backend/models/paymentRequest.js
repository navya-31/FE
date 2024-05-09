import mongoose from "mongoose";

const paymentRequestSchema = mongoose.Schema({
  user_id: { type: String, required: true },
  user_name: String,
  room_number: String,
  hotel_id: { type: String, required: true },
});

const paymentRequestModel = mongoose.model(
  "paymentRequestModel",
  paymentRequestSchema
);

export default paymentRequestModel;
