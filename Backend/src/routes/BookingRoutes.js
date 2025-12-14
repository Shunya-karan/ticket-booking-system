import { Router } from 'express';
import authMiddleware from "../middleware/authMiddleware.js";
import { bookseats, cancelSelectedSeats, getMyBookings, getTicketById } from '../controllers/bookingController.js';



const router = Router();

router.post("/book", authMiddleware, bookseats)

router.patch("/cancel-seats/:booking_id", authMiddleware, cancelSelectedSeats
);
router.get('/my-bookings', authMiddleware, getMyBookings)

router.get("/ticket/:booking_id", getTicketById);

export default router;
