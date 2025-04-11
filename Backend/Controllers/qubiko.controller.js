import { chatModel } from "../Models/chat.model.js";

// !get history prompt
export const getHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const history = await chatModel.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, history });
  } catch (error) {
    console.error("getHistory controller Error:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}; 

// !get history prompt 
export const deleteHistory = async (req, res) => {
  try {
    const { chatId } = req.body;

    if (!chatId) {
      return res.status(400).json({ success: false, message: "Chat Required" });
    }
    const deletedChat = await chatModel.findByIdAndDelete(chatId);

    if (!deletedChat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    res.status(200).json({ success: true, message: "Chat Delete Succesfully" });
  } catch (error) {
    console.error("deleteHistory controller Error:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// !delete ALL History Data
export const deleteAllHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    await chatModel.deleteMany({ userId });
    res
      .status(200)
      .json({ success: true, message: "History Deleted" });
  } catch (error) {
    console.error("deleteAllHistory controller Error:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};
