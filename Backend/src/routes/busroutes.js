import { Router } from "express";
 import authMiddleware from "../middleware/authMiddleware.js";
 import { adminMiddleware } from "../middleware/adminMiddleware.js";
 import { addBus, deletingBus, getAllBuses, updateBus,getSearchBuses,getAllActiveBus ,getBusDetails} from "../controllers/busController.js";
 

const router=Router();

router.post("/add_bus",authMiddleware,adminMiddleware,addBus);

router.get("/all",authMiddleware,adminMiddleware,getAllBuses);

router.put("/update/:bus_id", authMiddleware, adminMiddleware, updateBus);

router.delete("/delete/:bus_id", authMiddleware, adminMiddleware, deletingBus);

router.get("/search", getSearchBuses);

router.get("/list", getAllActiveBus);

router.get("/:bus_id", getBusDetails);


export default router;