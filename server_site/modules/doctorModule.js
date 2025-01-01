import express from "express";
import doctorModel from "../usermodel/doctorSchema.js";
import appointmentModel from "../usermodel/appointmentSchema.js";
import userSchema from "../usermodel/userSchema.js";
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
   

// controllers/doctorController.js

export const updateDoctorInfo = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body,
      { new: true }  
    );
    res.status(200).json({
      success: true,
      msg: "Doctor info updated successfully",
      data: doctor,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error updating doctor info",
      success: false,
      error,
    });
  }
};

     


export const doctorInformation = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    console.log(doctor);
    if (!doctor) {
      return res.status(404).json({ msg: "Doctor not found", success: false });
    }
    res.status(200).json({
      success: true,
      data: doctor,
      msg: "Doctor info fetched successfully",
    });
  } catch (error) {
    console.error("Error getting doctor info: ", error);
    return res.status(500).json({ msg: "Error getting doctor info", success: false, error });
  }
};



export const getAppointmentsByDoctorId = async (req, res) => {
  try {
    const doctor = await doctorModel.find({ userId: req.body.userId });
    if (!doctor || doctor.length === 0) {
      return res.status(404).json({ msg: "Doctor not found", success: false });
    }

    const appointments = await appointmentModel.find({ doctorId: doctor[0]._id });
    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ msg: "No appointments found", success: false });
    }

    res.status(200).json({
      success: true,
      msg: "Appointments fetched successfully",
      data: appointments,
    });
  } catch (error) {
    console.error("Error getting appointments info: ", error);
    return res.status(500).json({
      msg: "Error getting appointments info",
      success: false,
      error: error.message || error,
    });
  }
};



export const chngAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
  

    const appointment = await appointmentModel.findByIdAndUpdate(appointmentId, { status });

    if (!appointment) {
      console.log('appointment not found');
      return res.status(404).json({
        success: false,
        msg: "appointment not found",
      });
    }

   

    const user = await userSchema.findOne({ _id: appointment.userId });
    if (!user) {
      console.log('User not found');
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    console.log('User found:', user);

    const unseenNotifications = user.unseenNotifications || [];
    unseenNotifications.push({
      type: "appointment-status-changed",
      message: `Your appointment status has been ${status}`,
      onclickPath: "/appointments",
    });

    user.unseenNotifications = unseenNotifications; // Ensure notifications are set correctly
  
    await user.save();

    console.log('User updated successfully:', user);

    return res.status(200).json({
      success: true,
      msg: "Appointment status updated successfully",
    });

  } catch (error) {
    console.error('Error during changing  appointment status:', error);
    return res.status(500).json({
      msg: "Error changing  appointment status",
      success: false,
      error: error.message // Include error message
    });
  }
};
