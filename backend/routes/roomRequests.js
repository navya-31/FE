import express from 'express';
import { getRoomRequests, getRoomRequestsByRoomId, getRoomRequestsByHotelId, getRoomRequestsByUserId,
     createRoomRequest, updateRoomRequest, deleteRoomRequest } from '../controllers/roomRequests.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', getRoomRequests);
router.get('/u/:id',getRoomRequestsByUserId);
router.get('/r/:id',getRoomRequestsByRoomId);
router.get('/h/:id',getRoomRequestsByHotelId);
router.post('/', auth, createRoomRequest);
router.patch('/:id', auth, updateRoomRequest);
router.delete('/:id', auth, deleteRoomRequest);
export default router;