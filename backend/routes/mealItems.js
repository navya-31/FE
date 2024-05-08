import express from 'express';
import { createMealItem, deleteMealItem, deleteMealItemsByHotelId, getMealItems, getMealItemsByHotel, updateMealItem } from '../controllers/mealItems.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/',getMealItems);
router.get('/h/:id',getMealItemsByHotel);
router.post('/',auth,createMealItem);
router.patch('/:id',auth,updateMealItem);
router.delete('/h/:id',auth,deleteMealItemsByHotelId)
router.delete('/:id',auth,deleteMealItem);

export default router;