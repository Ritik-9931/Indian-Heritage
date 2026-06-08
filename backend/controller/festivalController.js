// controllers/festivalController.js

import Festival from "../models/Festival.js";
import slugify from "slugify";

// CREATE FESTIVAL
export const createFestival = async (req, res) => {
  try {
    const { festivalName, description, startDate, endDate, significance } =
      req.body;

    // 1. generate base slug
    let slug = slugify(festivalName, {
      lower: true,
      strict: true,
    });

    // 2. check if slug already exists
    const existing = await Festival.findOne({ slug });

    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    // 3. create festival
    const festival = await Festival.create({
      festivalName,
      description,
      startDate,
      endDate,
      significance,
      slug,
    });

    res.status(201).json({
      success: true,
      festival,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL FESTIVALS
export const getFestivals = async (req, res) => {
  try {
    const festivals = await Festival.find().sort({ startDate: 1 });

    res.status(200).json({
      success: true,
      festivals,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE FESTIVAL
export const getSingleFestival = async (req, res) => {
  try {
    const festival = await Festival.findById(req.params.id);

    if (!festival) {
      return res.status(404).json({
        message: "Festival not found",
      });
    }

    res.status(200).json({
      success: true,
      festival,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE FESTIVAL
export const updateFestival = async (req, res) => {
  try {
    const festival = await Festival.findByIdAndUpdate(
      req.params.id,

      req.body,

      {
        new: true,
      },
    );

    res.status(200).json({
      success: true,
      festival,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE FESTIVAL
export const deleteFestival = async (req, res) => {
  try {
    await Festival.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Festival deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
