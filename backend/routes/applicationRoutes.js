import Express from "express";
import {createJobApplication,
    getJobApplications,
    getJobApplicationById,
    updateJobApplication,
    deleteJobApplication} from "../controllers/applicationController.js";
import protect from "../middleware/authMiddleware.js";

const router = Express.Router();

//Create a new job application
router.post("/",protect,createJobApplication);
router.get("/",protect,getJobApplications);
router.get("/:id",protect,getJobApplicationById);
router.put("/:id",protect,updateJobApplication);
router.delete("/:id",protect,deleteJobApplication);


export default router;
//protect – verifies the JWT.
//createApplication – creates the job application.