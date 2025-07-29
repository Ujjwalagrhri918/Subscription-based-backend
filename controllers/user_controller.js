import User from "../models/usermodel.js";

// @desc   Get all users
// @route  GET /api/v1/users
// @access Public or Protected (depending on your middleware)
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password"); // Exclude password
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   Get user by ID
// @route  GET /api/v1/users/:id
// @access Public or Protected (depending on your middleware)
export const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id; // get the id from the req url

    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
