import express from "express";
import doctorModel from "../usermodel/doctorSchema.js";

export const doctorInfo = async (req, res) => {
     try {
       const doctor = await doctorModel.findOne({ _id: req.body.userId });
       res.status(200).json({
         success: true,
         data: doctor,
       });
     } catch (error) {
       return res
         .status(500)
         .json({ msg: "Error getting doctor info ", success: false, error });
     }
   };
   