import express from "express";
import doctorModel from "../usermodel/doctorSchema.js";

export const doctorInfo = async (req, res) => {
     try {
       const doctor = await doctorModel.findOne({ userId: req.body.userId });
       res.status(200).json({
         success: true,
         data: doctor,
         msg: "Doctor info fetched successfully",
       });
     } catch (error) {
       return res
         .status(500)
         .json({ msg: "Error getting doctor info ", success: false, error });
     }
   };
   