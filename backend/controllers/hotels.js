import mongoose from "mongoose";
import hotelModel from "../models/hotel.js";
import ownerModel from "../models/owner.js";
import tenantModel from "../models/tenant.js";


export const getHotels = async (req, res) => {
  try {
    const hotels = await hotelModel.find();
    console.log(hotels);
    res.status(200).json(hotels);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createHotel = async (req, res) => {
  const hotel = req.body;
  const newHotel = new hotelModel(hotel);
  try {
    const o_id = newHotel.owner_id;
    const updatedOwner = await ownerModel.updateOne(
      { user_id: o_id },
      { $set: { hotel_id: newHotel._id, hotel_name: newHotel.name } }
    );

    await newHotel.save();
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateHotel = async (req, res) => {
  const { id: _id } = req.params;
  const hotel = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No hotel with that ID");
  }

  const updatedHotel = await hotelModel.findByIdAndUpdate(
    _id,
    { ...hotel, _id },
    { new: true }
  );
  res.json(updatedHotel);
};

export const deleteHotel = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No hotel with that ID");
  }

  await hotelModel.findByIdAndRemove(id);

  res.json("Hotel Deleted Successfully");
};

export const getHotelByOwnerId = async (req, res) => {
  const { id } = req.params;
  try {
    const ownedHotel = await hotelModel.findOne({ owner_id: id });

    if (!ownedHotel) {
      return res.status(404).send("No hotels owned by that ID");
    }
    res.status(200).json(ownedHotel);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getHotelByHotelId = async (req, res) => {
  const { id } = req.params;
  try {
    const hotel = await hotelModel.findOne({ _id: id });

    if (!hotel) {
      return res.status(404).send("No hotels with that ID");
    }
    res.status(200).json(hotel);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const generateBill = async (req, res) => {
  const id = req.params.id;
  try {
    const today = new Date();
    // console.log(today.getFullYear(),today.getMonth(), 1 )
    const firstDateOfThisMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );
    const billpayers = await tenantModel.updateMany(
      { hotel_id: id },
      { $set: { bill_paid: false } }
    );
    const updatedBillDate = await hotelModel.updateMany(
      { _id: id },
      { $set: { last_bill_generated_date: firstDateOfThisMonth } }
    );
    res.json(billpayers);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const receiveBill = async (req, res) => {
  const uid = req.params.uid;
  try {
    // const tenants = await tenantModel.find({hotel_id: id});
    // if(!tenants)
    // {
    //     return res.status(404).send('No tenants with that hotel ID');
    // }

    const billpayers = await tenantModel.updateOne(
      { user_id: uid }, // if bugging, replace user_id with _id here
      { $set: { bill_paid: true } }
    );
    res.json(billpayers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
