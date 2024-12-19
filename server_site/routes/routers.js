import express from "express";
import { validate,signUpValidation,loginValidation } from "../validation/errorHandling.js";
import { singup,login, userInfo,applyDoc,seenNoti,deleteNoti } from "../modules/module.js";
import { authMiddleware } from "../middlewares/middleware.js";



const router = express.Router();

router.post("/reg",signUpValidation,validate,singup);
router.post("/login",loginValidation,validate,login);
router.post("/get-userid",authMiddleware,userInfo);
router.post("/apply-doc",authMiddleware,applyDoc);
router.post("/mark-all-notif-as-seen",authMiddleware,seenNoti);
router.post("/delete-all-notif",authMiddleware,deleteNoti);

export default router;