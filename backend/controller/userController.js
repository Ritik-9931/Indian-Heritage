import User from "../models/User.js";

// GET PROFILE
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: "favoriteTemples",
        populate: [
          { path: "state", select: "stateName" },
          { path: "city", select: "cityName" },
        ],
      })
      .populate({
        path: "visitedTemples",
        populate: [
          { path: "state", select: "stateName" },
          { path: "city", select: "cityName" },
        ],
      });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ADD FAVORITE
export const addFavoriteTemple = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.favoriteTemples.includes(req.params.templeId)) {
      user.favoriteTemples.push(req.params.templeId);
    }

    await user.save();

    const updatedUser = await User.findById(user._id)
      .select("-password")
      .populate({
        path: "favoriteTemples",
        populate: [
          { path: "state", select: "stateName" },
          { path: "city", select: "cityName" },
        ],
      })
      .populate({
        path: "visitedTemples",
        populate: [
          { path: "state", select: "stateName" },
          { path: "city", select: "cityName" },
        ],
      });

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// REMOVE FAVORITE
export const removeFavoriteTemple = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.favoriteTemples = user.favoriteTemples.filter(
      (id) => id.toString() !== req.params.templeId,
    );

    await user.save();

    const updatedUser = await User.findById(user._id)
      .select("-password")
      .populate({
        path: "favoriteTemples",
        populate: [
          { path: "state", select: "stateName" },
          { path: "city", select: "cityName" },
        ],
      })
      .populate({
        path: "visitedTemples",
        populate: [
          { path: "state", select: "stateName" },
          { path: "city", select: "cityName" },
        ],
      });

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ADD VISITED
export const addVisitedTemple = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.visitedTemples.includes(req.params.templeId)) {
      user.visitedTemples.push(req.params.templeId);
    }

    await user.save();

    const updatedUser = await User.findById(user._id)
      .select("-password")
      .populate({
        path: "favoriteTemples",
        populate: [
          { path: "state", select: "stateName" },
          { path: "city", select: "cityName" },
        ],
      })
      .populate({
        path: "visitedTemples",
        populate: [
          { path: "state", select: "stateName" },
          { path: "city", select: "cityName" },
        ],
      });

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// REMOVE VISITED
export const removeVisitedTemple = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.visitedTemples = user.visitedTemples.filter(
      (id) => id.toString() !== req.params.templeId,
    );

    await user.save();

    const updatedUser = await User.findById(user._id)
      .select("-password")
      .populate({
        path: "favoriteTemples",
        populate: [
          { path: "state", select: "stateName" },
          { path: "city", select: "cityName" },
        ],
      })
      .populate({
        path: "visitedTemples",
        populate: [
          { path: "state", select: "stateName" },
          { path: "city", select: "cityName" },
        ],
      });

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.role = req.body.role;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Role updateSuccessfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
