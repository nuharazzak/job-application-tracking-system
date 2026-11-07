import express from "express";
import  protect  from "../middleware/authMiddleware.js";
import{registeredUser,loginUser,getUserProfile} from "../controllers/authController.js";



const router = express.Router();

router.post("/register",registeredUser);
router.post("/login",loginUser);
router.get("/profile", protect,getUserProfile);

export default router;