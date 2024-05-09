import mongoose from "mongoose";

const mealItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  hotel_id: { type: String, required: true },
  hotel_name: String,
  unit_price: {
    type: Number,
    min: 0,
  },
});

const mealItemModel = mongoose.model("mealItemModel", mealItemSchema);

export default mealItemModel;
