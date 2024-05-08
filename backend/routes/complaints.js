import express from 'express';

import auth from '../middleware/auth.js';
import { getComplaints, getComplaintsByHotel, getComplaintsByUser, createComplaint, updateComplaint, deleteComplaint } from '../controllers/complaints.js';
const router = express.Router();

router.get('/',getComplaints);
router.get('/h/:id',getComplaintsByHotel);
router.get('/u/:id',getComplaintsByUser);
router.post('/', auth, createComplaint);
router.patch('/:id',auth,updateComplaint);
router.delete('/:id',auth,deleteComplaint);

export default router;