import express from "express";
import { validate,signUpValidation,loginValidation } from "../validation/errorHandling.js";
import { singup,login, userInfo,applyDoc,seenNotifications,deleteNotifications } from "../modules/userModule.js";
import { getUsers,getDoctors,chngDocUsers } from "../modules/adminModule.js";
import { doctorInfo } from "../modules/doctorModule.js";
import { authMiddleware } from "../middlewares/middleware.js";
import { updateDoctorInfo } from "../modules/doctorModule.js";
const router = express.Router();

router.post("/reg",signUpValidation,validate,singup);
router.post("/login",loginValidation,validate,login);
router.post("/get-userid",authMiddleware,userInfo);
router.post("/apply-doc",authMiddleware,applyDoc);
router.get("/get-all-users",authMiddleware,getUsers);
router.get("/get-all-docs",authMiddleware,getDoctors);
router.post("/mark-all-notif-as-seen",authMiddleware,seenNotifications);
router.post("/delete-all-notif",authMiddleware,deleteNotifications);
router.post("/change-doc-status",authMiddleware,chngDocUsers);
router.post("/get-doctor-info-by-user-id",authMiddleware,doctorInfo);
router.post("/update-doctor-profile",authMiddleware,updateDoctorInfo);

export default router;