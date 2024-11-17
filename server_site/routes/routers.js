import express from "express";
import { validate,signUpValidation,loginValidation } from "../validation/errorHandling.js";
import { singup,login } from "../modules/module.js";

const router = express.Router();

router.post("/reg",signUpValidation,validate,singup);
router.post("/login",loginValidation,validate,login);

export default router;