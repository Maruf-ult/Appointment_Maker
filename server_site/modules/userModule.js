import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import doctorModel from "../usermodel/doctorSchema.js";
import userSchema from "../usermodel/userSchema.js";
import appointmentModel from "../usermodel/appointmentSchema.js";





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
        msg: "all notification deleted successfully",
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
     req.body.status = "pending";
     const needAppointment = await appointmentModel(req.body);
     await needAppointment.save();
     const user = await userSchema.findOne({ _id: req.body.doctorInfo.userId });
     user.unseenNotifications.push({
       type: "new appointment-request-from-patient",
       message: `${req.body.userInfo.name} wants to book an appointment with you`,
       onclickPath: "/appointments",
    })
         
      await user.save();

     res.status(200).json({
       success: true,
       msg: "Appointment booked successfully",
       data: needAppointment,
     });
  } catch (error) {
    console.error("Error getting appointment: ", error);
    return res.status(500).json({
      msg: "Error getting appointment",
      success: false,
      error: error.message || error
    });
  }
};


