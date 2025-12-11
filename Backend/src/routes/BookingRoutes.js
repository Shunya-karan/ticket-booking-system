import {Router} from 'express';
import authMiddleware from "../middleware/authMiddleware.js";
import { bookseats,cancelSelectedSeats,getMyBookings } from '../controllers/bookingController.js';



const router= Router();

router.post("/book",authMiddleware,bookseats)

router.patch("/cancel-seats/:booking_id",authMiddleware,cancelSelectedSeats
);


router.get('/my-bookings',authMiddleware,getMyBookings)



export default router;
