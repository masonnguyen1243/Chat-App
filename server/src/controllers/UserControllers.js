import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils/jwt.js";
import ms from "ms";
import { v4 as uuidv4 } from "uuid";
import SendEmail from "../utils/sendEmail.js";
import { CloudinaryProvider } from "../utils/cloudinary.js";

//Signup
export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, bio } = req.body;

    if (!fullName || !email || !password || !bio) {
      return res
        .status(404)
        .json({ success: false, message: "Missing Details" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Account already exists" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message:
          "Password must include at least 1 letter, a number, and at least 8 characters.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio,
      verifyToken: uuidv4(),
    });

    await newUser.save();

    //Send Email
    const verificationLink = `http://localhost:5173/account/verification?email=${newUser.email}&token=${newUser.verifyToken}`;
    const customSubject = "Please verify your email before using our service";
    const htmlContent = `
      <h3>Here is your verification link</h3>
      <h3>${verificationLink}</h3>
      <h3>Sincerely, <br/> - Chat App - </h3>
    `;

    await SendEmail(newUser.email, customSubject, htmlContent);

    return res.status(200).json({
      success: true,
      message:
        "Account created successfully! Please check email to verify your account",
      data: newUser,
    });
  } catch (error) {
    console.error("Error in signUp controllers");

    return res.status(500).json({ success: false, message: error.message });
  }
};

//Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .json({ success: false, message: "Missing Details" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid Credentials" });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Please verify your account before login!",
      });
    }

    const accessToken = generateAccessToken(user._id, user.role);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: ms("7 days"),
    };
    res.cookie("accessToken", accessToken, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Login successfully!",
      data: user,
      accessToken,
    });
  } catch (error) {
    console.error("Error in login controllers");

    return res.status(500).json({ success: false, message: error.message });
  }
};

//Logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken");

    return res
      .status(200)
      .json({ success: false, message: "Logged out successfully!" });
  } catch (error) {
    console.error("Error in logout controllers");

    return res.status(500).json({ success: false, message: error.message });
  }
};

//Verification account
export const verifyAccount = async (req, res) => {
  try {
    const { email, token } = req.body;
    if (!email || !token) {
      return res
        .status(404)
        .json({ success: false, message: "Missing Details" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.isActive) {
      return res.status(400).json({
        success: false,
        message:
          "Your account is already verify! Please login to enjoy our services!",
      });
    }

    if (token !== user.verifyToken) {
      return res.status(400).json({ success: false, message: "Invalid Token" });
    }

    user.isActive = true;
    user.verifyToken = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Verification successfully! Please login to enjoy our services!",
    });
  } catch (error) {
    console.error("Error in verifyAccount controllers");

    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { bio, fullName } = req.body;
    const profilePic = req.file;

    const userId = req.user.userId;

    if (!userId)
      return res
        .status(404)
        .json({ success: false, message: "Account not found!" });

    let updatedUser;

    if (!profilePic) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { bio, fullName },
        { new: true }
      );
    } else {
      const upload = await CloudinaryProvider.streamUpload(
        profilePic.buffer,
        "user"
      );

      updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          profilePic: upload.secure_url,
          bio,
          fullName,
        },
        { new: true }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Update user successfully!",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error in updateUser controllers");

    return res.status(500).json({ success: false, message: error.message });
  }
};
