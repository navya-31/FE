import express from 'express';

import auth from '../middleware/auth.js';
import { getReviews, getReviewsByHotel, getReviewsByUser, createReview, updateReview, deleteReview, getReviewsByUserAndHotel } from '../controllers/reviews.js';
const router = express.Router();

router.get('/',getReviews);
router.get('/h/:id',getReviewsByHotel);
router.get('/u/:id',getReviewsByUser);
router.get('/userhotel/:uid/:hid',getReviewsByUserAndHotel);
router.post('/', auth, createReview);
router.patch('/:id',auth,updateReview);
router.delete('/:id',auth,deleteReview);

export default router;