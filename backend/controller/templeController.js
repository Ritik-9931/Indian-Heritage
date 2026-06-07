import cloudinary from "../config/cloudinary.js";
import Temple from "../models/Temple.js";

export const createTemple = async (req, res) => {
  try {
    let uploadedImages = [];

    // MULTIPLE IMAGE UPLOAD
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploaded = await cloudinary.uploader.upload(file.path, {
          folder: "temples",
        });

        uploadedImages.push({
          url: uploaded.secure_url,
          public_id: uploaded.public_id,
        });
      }
    }

    const temple = await Temple.create({
      templeName: req.body.templeName,

      slug: req.body.slug,

      state: req.body.state,

      city: req.body.city,

      deity: req.body.deity,

      address: req.body.address,

      location: {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      },

      festivals: req.body.festivals || [],

      rituals: req.body.rituals || [],

      pilgrimageCircuits: req.body.pilgrimageCircuits || [],

      history: req.body.history,

      significance: req.body.significance,

      architecture: req.body.architecture,

      darshanTimings: {
        morning: req.body.morning,
        evening: req.body.evening,
      },

      visitorInfo: {
        dressCode: req.body.dressCode,

        photographyAllowed: req.body.photographyAllowed,

        entryFee: req.body.entryFee,
      },

      featured: req.body.featured,

      images: uploadedImages,
    });

    res.status(201).json({
      success: true,
      temple,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTemples = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    let query = {};

    if (req.query.keyword) {
      query.$or = [
        {
          templeName: {
            $regex: req.query.keyword,
            $options: "i",
          },
        },
        {
          history: {
            $regex: req.query.keyword,
            $options: "i",
          },
        },
      ];
    }

    if (req.query.state) {
      query.state = req.query.state;
    }

    if (req.query.city) {
      query.city = req.query.city;
    }

    if (req.query.deity) {
      query.deity = req.query.deity;
    }

    const totalTemples = await Temple.countDocuments(query);

    const temples = await Temple.find(query)
      .populate("state", "stateName")
      .populate("city", "cityName")
      .populate("deity", "deityName")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: temples.length,
      totalPages: Math.ceil(totalTemples / limit),
      currenntPage: page,
      data: temples,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTempleById = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id)
      .populate("state", "stateName")
      .populate("city", "cityName")
      .populate("deity", "deityName")
      .populate("festivals", "festivalName")
      .populate("rituals", "ritualName")
      .populate("pilgrimageCircuits", "circuitName")
      .populate("reviews.user", "name email role");

    if (!temple) {
      return res.status(404).json({
        message: "Temple not found",
      });
    }

    res.status(200).json({
      success: true,
      temple,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const temple = await Temple.findById(req.params.id);

    if (!temple) {
      return res.status(404).json({
        success: false,
        message: "Temple not found",
      });
    }

    const alreadyReviewed = temple.reviews.find(
      (review) => review.user.toString() === req.user._id.toString(),
    );

    if (alreadyReviewed) {
      alreadyReviewed.rating = Number(rating);
      alreadyReviewed.comment = comment;
    } else {
      temple.reviews.push({
        user: req.user._id,
        rating: Number(rating),
        comment,
      });
    }

    const total = temple.reviews.reduce((acc, item) => acc + item.rating, 0);

    temple.ratings.average = total / temple.reviews.length;

    temple.ratings.totalReviews = temple.reviews.length;

    await temple.save();

    res.status(200).json({
      success: true,
      message: "Review added Successfully",
      temple,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);

    if (!temple) {
      return res.status(404).json({
        success: false,
        message: "Temple not found",
      });
    }

    const review = temple.reviews.id(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    const isOwner = review.user.toString() === req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    temple.reviews = temple.reviews.filter(
      (r) => r._id.toString() !== req.params.reviewId,
    );

    const totalRating = temple.reviews.reduce(
      (acc, item) => acc + item.rating,
      0,
    );

    temple.ratings.totalReviews = temple.reviews.length;

    temple.ratings.average =
      temple.reviews.length > 0 ? totalRating / temple.reviews.length : 0;

    await temple.save();

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      temple,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
