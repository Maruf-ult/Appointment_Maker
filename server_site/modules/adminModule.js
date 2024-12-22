import doctorSchema from "../usermodel/doctorSchema.js";
import userSchema from "../usermodel/userSchema.js";

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
        msg: "User fetched successfully",
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
        msg: "doctors fetched successfully",
        data: doc,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error getting user info ", success: false, error });
  }
};
export const chngDocUsers = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    console.log(`Received request to update doctor ${doctorId} with status ${status}`);

    const doctor = await doctorSchema.findByIdAndUpdate(doctorId, { status });

    if (!doctor) {
      console.log('Doctor not found');
      return res.status(404).json({
        success: false,
        msg: "Doctor not found",
      });
    }

    console.log('Doctor found:', doctor);

    const user = await userSchema.findOne({ _id: doctor.userId });
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
      type: "new-doctor-request-changed",
      message: `Your doctor account has been ${status}`,
      onclickPath: "/notifications",
    });

    user.unseenNotifications = unseenNotifications; // Ensure notifications are set correctly
    user.isDoctor = status === "approved"? true : false;
    await user.save();

    console.log('User updated successfully:', user);

    return res.status(200).json({
      success: true,
      msg: "Doctor status updated successfully",
    });

  } catch (error) {
    console.error('Error during doctor account update:', error);
    return res.status(500).json({
      msg: "Error applying doctor account",
      success: false,
      error: error.message // Include error message
    });
  }
};
