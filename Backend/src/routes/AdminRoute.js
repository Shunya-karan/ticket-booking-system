import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { addBus, deletingBus, getActiveBus, getAdminProfile, getAdminStats, getAllBookingofBus, getAllBuses, getRecentBookings, getRevenueOverview, getSingleBus, getUpcomingBuses, updateAdminProfile, updateBus } from "../controllers/adminController.js";


const router = Router();

router.get("/bus/:bus_id", authMiddleware, adminMiddleware, getAllBookingofBus)

router.get("/stats", authMiddleware, adminMiddleware, getAdminStats);

router.post("/add_bus", authMiddleware, adminMiddleware, addBus);

router.get("/all", authMiddleware, adminMiddleware, getAllBuses);

router.get("/active-buses", getActiveBus);

router.put("/update/:bus_id", authMiddleware, adminMiddleware, updateBus);

router.delete("/delete/:bus_id", authMiddleware, adminMiddleware, deletingBus);

router.get("/recent-bookings", getRecentBookings);

router.get("/revenue", getRevenueOverview);

router.get("/upcoming-buses", getUpcomingBuses);

router.get("/bus-detail/:bus_id", authMiddleware, adminMiddleware, getSingleBus);

router.get("/profile", authMiddleware, adminMiddleware, getAdminProfile);


router.put("/profile", authMiddleware, adminMiddleware, updateAdminProfile);


export default router