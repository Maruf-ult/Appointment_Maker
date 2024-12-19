import userSchema from "../usermodel/userSchema.js";
import doctorSchema from "../usermodel/doctorSchema.js";

export const getUsers = async (req, res) => {
     try {
       const user = await userSchema.find({});
       if (!user) {
         return res
           .status(200)
           .json({ msg: "user does not exist", success: false });
       } else {
         res.status(200).json({
           success: true,
           msg:"User fetched successfully",
           data: user,
         });
       }
     } catch (error) {
       return res
         .status(500)
         .json({ msg: "Error getting user info ", success: false, error });
     }
   };



   export const getDoctors = async (req, res) => {
     try {
       const doc = await doctorSchema.find({});
       if (!doc) {
         return res
           .status(200)
           .json({ msg: "doctors does not exist", success: false });
       } else {
         res.status(200).json({
           success: true,
           msg:"doctors fetched successfully",
           data: doc,
         });
       }
     } catch (error) {
       return res
         .status(500)
         .json({ msg: "Error getting user info ", success: false, error });
     }
   };