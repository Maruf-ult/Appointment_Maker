import express from "express";
import { validate,signUpValidation,loginValidation } from "../validation/errorHandling.js";
import { singup,login, userInfo,applyDoc } from "../modules/module.js";
import { authMiddleware } from "../middlewares/middleware.js";



const router = express.Router();

router.post("/reg",signUpValidation,validate,singup);
router.post("/login",loginValidation,validate,login);
router.post("/get-userid",authMiddleware,userInfo);
router.post("/apply-doc",authMiddleware,applyDoc);

export default router;