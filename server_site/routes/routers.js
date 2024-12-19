import express from "express";
import { validate,signUpValidation,loginValidation } from "../validation/errorHandling.js";
import { singup,login, userInfo,applyDoc,seenNotifications,deleteNotifications } from "../modules/userModule.js";
import { getUsers,getDoctors } from "../modules/adminModule.js";
import { authMiddleware } from "../middlewares/middleware.js";


const router = express.Router();

router.post("/reg",signUpValidation,validate,singup);
router.post("/login",loginValidation,validate,login);
router.post("/get-userid",authMiddleware,userInfo);
router.post("/apply-doc",authMiddleware,applyDoc);
router.get("/get-all-users",authMiddleware,getUsers);
router.get("/get-all-docs",authMiddleware,getDoctors);
router.post("/mark-all-notif-as-seen",authMiddleware,seenNotifications);
router.post("/delete-all-notif",authMiddleware,deleteNotifications);

export default router;