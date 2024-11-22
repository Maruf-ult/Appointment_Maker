import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userSchema from "../usermodel/userSchema.js";

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
    console.log("Received userId:", req.body.userId);
    const user = await userSchema.findOne({ _id: req.body.userId });
    if (!user) {
      return res
        .status(200)
        .json({ msg: "user does not exist", success: false });
    } else {
      res.status(200).json({
        success: true,
        data: {
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error getting user info ", success: false, error });
  }
};
