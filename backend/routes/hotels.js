import express from 'express';
import { getHotels, createHotel, updateHotel, deleteHotel, getHotelByOwnerId, getHotelByHotelId, generateBill, receiveBill } from '../controllers/hotels.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', getHotels);
router.get('/o/:id',getHotelByOwnerId);
router.get('/h/:id',getHotelByHotelId);
router.patch('/bills/create/:id',generateBill);
router.patch('/bills/receive/:uid',receiveBill);
router.post('/', auth, createHotel);
router.patch('/:id', auth, updateHotel);
router.delete('/:id', auth, deleteHotel);
export default router;