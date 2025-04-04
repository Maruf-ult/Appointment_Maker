import express from "express";
import { validate,signUpValidation,loginValidation } from "../validation/errorHandling.js";
import { signup,login, userInfo,applyDoc,seenNotifications,deleteNotifications, getAppointmentsByUserId } from "../modules/userModule.js";
import { getUsers,getDoctors,chngDocUsers } from "../modules/adminModule.js";
import { chngAppointmentStatus, doctorInfo, getAppointmentsByDoctorId } from "../modules/doctorModule.js";
import { authMiddleware } from "../middlewares/middleware.js";
import { updateDoctorInfo } from "../modules/doctorModule.js";
import { getApproveDoctors } from "../modules/userModule.js";
import { doctorInformation } from "../modules/doctorModule.js";
import { makeAppointment } from "../modules/userModule.js";
import { checkBookingAvailability } from "../modules/userModule.js";

const router = express.Router();

router.post("/reg",signUpValidation,validate,signup);
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
router.get("/get-all-approved-doctors",authMiddleware,getApproveDoctors);
router.post("/get-doctor-info-by-id",authMiddleware,doctorInformation);
router.post("/book-appointment",authMiddleware,makeAppointment);
router.post("/check-booking-availability",authMiddleware,checkBookingAvailability);
router.get("/get-appointments-by-user-id",authMiddleware,getAppointmentsByUserId);
router.get("/get-appointments-by-doctor-id",authMiddleware,getAppointmentsByDoctorId);
router.post("/change-appointment-status",authMiddleware,chngAppointmentStatus);

export default router;