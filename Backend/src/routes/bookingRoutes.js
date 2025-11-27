import {Router} from 'express';
import authMiddleware from "../middleware/authMiddleware.js";
import { bookseats,cancelSelectedSeats, getAllBookingofBus, getMyBookings } from '../controllers/bookingController.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';


const router= Router();

router.post("/book",authMiddleware,bookseats)
router.patch("/cancel-seats/:booking_id",authMiddleware,cancelSelectedSeats
);

router.get('/my-booking',authMiddleware,getMyBookings)
router.get("/admin/bus/:bus_id",authMiddleware,adminMiddleware,getAllBookingofBus)
export default router;
