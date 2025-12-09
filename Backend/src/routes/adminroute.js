import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { addBus, deletingBus, getActiveBus, getAdminStats,getAllBookingofBus, getAllBuses, getRecentBookings, getRevenueOverview, getUpcomingBuses, updateBus } from "../controllers/adminController.js";


const router= Router();

router.get("/bus/:bus_id",authMiddleware,adminMiddleware,getAllBookingofBus)

router.get("/stats",authMiddleware,adminMiddleware,getAdminStats);

router.post("/add_bus",authMiddleware,adminMiddleware,addBus);

router.get("/all",authMiddleware,adminMiddleware,getAllBuses);

router.get("/active-buses", getActiveBus);

router.put("/update/:bus_id", authMiddleware, adminMiddleware, updateBus);

router.delete("/delete/:bus_id", authMiddleware, adminMiddleware, deletingBus);

router.get("/recent-bookings", getRecentBookings);

router.get("/revenue", getRevenueOverview);

router.get("/upcoming-buses", getUpcomingBuses);


export default router