import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import doctorModel from "../usermodel/doctorSchema.js";
import userSchema from "../usermodel/userSchema.js";
import appointmentModel from "../usermodel/appointmentSchema.js";
import moment from "moment";




export const singup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userSchema.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ msg: "user already exists", success: false });
    }

    const userModel = new userSchema({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res
      .status(201)
      .json({ msg: "account created successfully", success: true, userModel });
  } catch (error) {
    return res.status(500).json({ msg: `an internal error occurred ${error}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(403).json({ msg: "user not found", success: false });
    }

    const isPassEql = await bcrypt.compare(password, user.password);
    if (!isPassEql) {
      return res
        .status(403)
        .json({ msg: "email or password is wrong ", success: false });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      msg: "logged in successfully",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (error) {
    return res.status(500).json({ msg: `an internal error occurred ${error}` });
  }
};

export const userInfo = async (req, res) => {
  try {
    const user = await userSchema.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .json({ msg: "user does not exist", success: false });
    } else {
      res.status(200).json({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error getting user info ", success: false, error });
  }
};


export const applyDoc = async (req, res) => {
  try {
    const newDoctor = new doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();

    const adminUser = await userSchema.findOne({ isAdmin: true });
    if (!adminUser) {
      throw new Error("Admin user not found");
    }

    const unseenNotifications = adminUser.unseenNotifications || [];
    unseenNotifications.push({
      type: "new-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
      data: {
        doctorId: newDoctor._id,
        name: `${newDoctor.firstName} ${newDoctor.lastName}`,
      },
      onclickPath: "/doctors",
    });

    await userSchema.findByIdAndUpdate(
      adminUser._id,
      { unseenNotifications },
      { new: true }
    );

    return res
      .status(201)
      .json({ msg: "Doctor account applied successfully", success: true });
  } catch (error) {
    console.error("Error during doctor application:", error);
    return res
      .status(500)
      .json({ msg: `An internal error occurred: ${error.message}` });
  }
};

export const seenNotifications = async (req, res) => {
  try {
    const user = await userSchema.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    user.seenNotifications.push(...user.unseenNotifications);
    user.unseenNotifications = [];

    const updatedUser = await user.save();

    updatedUser.password = undefined;
    return res
      .status(200)
      .json({
        success: true,
        msg: "All notifications marked as seen",
        data: updatedUser,
      });
  } catch (error) {
    console.error("Error during marking notifications as seen:", error);
    return res
      .status(500)
      .json({ msg: `An internal error occurred: ${error.message}` });
  }
};

export const deleteNotifications = async (req, res) => {
  try {
    const user = await userSchema.findOne({ _id: req.body.userId });
    user.seenNotifications = [];
    user.unseenNotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    return res
      .status(200)
      .json({
        success: true,
        msg: "All notification deleted successfully",
        data: updatedUser,
      });
  } catch (error) {
    console.error("Error during doctor application:", error);
    return res
      .status(500)
      .json({ msg: `An internal error occurred: ${error.message}` });
  }
};



export const getApproveDoctors = async (req, res) => {
  try {
    const docs = await doctorModel.find({ status: "approved" });
    if (!docs || docs.length === 0) {
      return res.status(404).json({ msg: "No approved doctors found", success: false });
    } else {
      res.status(200).json({
        success: true,
        msg: "Approved doctors fetched successfully",
        data: docs,
      });
    }
  } catch (error) {
    console.error("Error getting approved doctors info: ", error);
    return res.status(500).json({
      msg: "Error getting approved doctors info",
      success: false,
      error: error.message || error
    });
  }
};


export const makeAppointment = async (req, res) => {
  try {
    console.log("Appointment Request Body:", req.body);

    // Convert date to ISO format preserving the local time in UTC
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();

    req.body.status = "pending";
    
    if (!moment(req.body.date).isValid()) {
      console.log("Invalid date format");
    }
    if (!moment(req.body.time).isValid()) {
      console.log("Invalid time format");
    }

    const needAppointment = new appointmentModel(req.body);
    await needAppointment.save();

    const user = await userSchema.findOne({ _id: req.body.doctorInfo.userId });
    user.unseenNotifications.push({
      type: "new appointment-request-from-patient",
      message: `${req.body.userInfo.name} wants to book an appointment with you`,
      onclickPath: "/doctor/appointments",
    });
    await user.save();

    res.status(200).json({
      success: true,
      msg: "Appointment booked successfully",
      data: needAppointment,
    });
  } catch (error) {
    console.error("Error getting appointment:", error);
    return res.status(500).json({
      msg: "Error getting appointment",
      success: false,
      error: error.message || error
    });
  }
};


export const checkBookingAvailability = async (req, res) => {
  try {
    // Validate the required fields
    if (!req.body.date || !req.body.time || !req.body.doctorId) {
      return res.status(400).json({
        success: false,
        msg: "Missing required fields: date, time, or doctorId"
      });
    }

    // Convert date to ISO format preserving the local time in UTC
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const time = moment(req.body.time).toISOString();

    console.log("Parsed Date (ISO):", date);
    console.log("Parsed Time (ISO):", time);

    const fromTime = moment(time).subtract(60, "minutes").toISOString();
    console.log("From Time (ISO):", fromTime);

    const toTime = moment(time).add(60, "minutes").toISOString();
    console.log("To Time (ISO):", toTime);

    const doctorId = req.body.doctorId;
    console.log("Doctor ID:", doctorId);

    // Query the database
    const appointment = await appointmentModel.find({
      doctorId,
      date: {
        $gte: moment(fromTime).startOf('day').toISOString(),
        $lte: moment(toTime).endOf('day').toISOString()
      },
      time: { $gte: fromTime, $lte: toTime }
    });

    console.log("Found Appointments:", appointment);

    if (appointment?.length > 0) {
      return res.status(200).json({
        success: false,
        msg: "Appointment not available",
      });
    } else {
      return res.status(200).json({
        success: true,
        msg: "Appointment is available",
      });
    }
  } catch (error) {
    console.error("Error getting appointment:", error);
    return res.status(500).json({
      msg: "Error getting appointment",
      success: false,
      error: error.message || error
    });
  }
};


export const getAppointmentsByUserId = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({userId :req.body.userId });
    if (!appointments|| appointments.length === 0) {
      return res.status(404).json({ msg: "No approved appointmentss found", success: false });
    } else {
      res.status(200).json({
        success: true,
        msg: "Appointmnets fetched successfully",
        data: appointments,
      });
    }
  } catch (error) {
    console.error("Error getting appointments info: ", error);
    return res.status(500).json({
      msg: "Error getting appointments info",
      success: false,
      error: error.message || error
    });
  }
};
