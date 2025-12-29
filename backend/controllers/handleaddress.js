import { Address } from "../models/address.user.model.js";
import { usermodel } from "../models/user.model.js"; // 👈 Import user model for name

// POST address (only create if not exists)
const handleAddress = async (req, res) => {
  try {
    const { userId, houseNo, street, city, state, postalCode, country } = req.body;

    const existing = await Address.findOne({ userId });
    if (existing) {
      return res.status(400).json({ message: "Address already exists for this user", success: false });
    }

    const newAddress = new Address({ userId, houseNo, street, city, state, postalCode, country });
    await newAddress.save();

    res.status(201).json({ message: "Address saved successfully", address: newAddress, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message, success: false });
  }
};

// GET address + populate user name
const handleGetAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required", success: false });
    }

    const address = await Address.findOne({ userId }).populate("userId", "name email"); // 🔥 This brings user name

    if (!address) {
      return res.status(404).json({ message: "Address not found for this user", success: false });
    }

    res.status(200).json({
      success: true,
      address,
      name: address.userId.name,  // 👈 extra field for frontend if needed
      email: address.userId.email
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message, success: false });
  }
};

// UPDATE address
const handleUpdate = async (req, res) => {
  try {
    const { houseNo, street, city, state, postalCode, country } = req.body;
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "userId is required", success: false });
    }

    const updated = await Address.findOneAndUpdate(
      { userId },
      { houseNo, street, city, state, postalCode, country },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Address not found", success: false });
    }

    res.status(200).json({ message: "Address updated successfully", address: updated, success: true });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export default { handleAddress, handleGetAddress: handleGetAddress, handleupdate: handleUpdate };
