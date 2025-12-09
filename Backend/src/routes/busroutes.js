import { Router } from "express";
 import authMiddleware from "../middleware/authMiddleware.js";
 import { adminMiddleware } from "../middleware/adminMiddleware.js";
 import { getSearchBuses,getAllActiveBus ,getBusDetails,getPopularRoutes} from "../controllers/busController.js";
 

const router=Router();



router.get("/search", getSearchBuses);

router.get("/list", getAllActiveBus);

router.get("/popular-routes", getPopularRoutes);

router.get("/:bus_id", getBusDetails);


export default router;