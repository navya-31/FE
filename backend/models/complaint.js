import mongoose from "mongoose";

const complaintSchema = mongoose.Schema({
  tenant_id: { type: String, required: true },
  tenant_name: String,
  description: { type: String, required: true },
  room_id: { type: String, required: true },
  room_number: { type: String, required: true },
  hotel_id: { type: String, required: true },
  hotel_name: String,
  date_raised: {
    type: Date,
    default: new Date(),
  },
});

const complaintModel = mongoose.model("complaintModel", complaintSchema);

export default complaintModel;
