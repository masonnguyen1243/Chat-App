import Message from "../models/MessageModel.js";
import User from "../models/UserModel.js";
import { CloudinaryProvider } from "../utils/cloudinary.js";

//Get all users except the logged in user
export const getUserForSideBar = async (req, res) => {
  try {
    const userId = req.user.userId;

    const filterdUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    //Count number of message not seen
    const unseenMessage = {};
    const promises = filterdUsers.map(async (user) => {
      const messages = await Message.find({
        senderId: user._id,
        receiverId: userId,
        seen: false,
      });
      if (messages > 0) {
        unseenMessage[user._id] = messages.length;
      }
    });

    await Promise.all(promises);
    return res
      .status(200)
      .json({ success: true, users: filterdUsers, unseenMessage });
  } catch (error) {
    console.error("Error in getUserForSideBar Message controllers");

    return res.status(500).json({ success: false, message: error.message });
  }
};

//Get all message for selected user
export const getMessages = async (req, res) => {
  try {
    const { id: selectedUserId } = req.params;
    const myId = req.user.userId;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: selectedUserId },
        { senderId: selectedUserId, receiverId: myId },
      ],
    });

    await Message.updateMany(
      { senderId: selectedUserId, receiverId: myId },
      { seen: true }
    );

    return res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error in getMessages Message controllers");

    return res.status(500).json({ success: false, message: error.message });
  }
};

//api to mark message as seen using message id
export const markMessageAsSeen = async (req, res) => {
  try {
    const { id } = req.params;

    await Message.findByIdAndUpdate(id, { seen: true });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error in markMessageAsSeen Message controllers");

    return res.status(500).json({ success: false, message: error.message });
  }
};

//Send messages to selected user
export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const { image } = req.file;
    const receiverId = req.params.id;
    const senderId = req.user.userId;

    let imageUrl;
    if (image) {
      const uploadResponse = await CloudinaryProvider.streamUpload(
        image.buffer,
        "messages"
      );

      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    return res.status(200).json({ success: true, data: newMessage });
  } catch (error) {
    console.error("Error in markMessageAsSeen Message controllers");

    return res.status(500).json({ success: false, message: error.message });
  }
};
