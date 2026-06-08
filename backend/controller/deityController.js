// controllers/deityController.js

import Deity from "../models/Deity.js";
import slugify from "slugify";

// CREATE DEITY
export const createDeity = async (req, res) => {
  try {
    const { deityName, description, mythology, image } = req.body;

    const existingDeity = await Deity.findOne({
      deityName,
    });

    if (existingDeity) {
      return res.status(400).json({
        message: "Deity already exists",
      });
    }

    const slug = slugify(deityName, { lower: true, strict: true });

    const deity = await Deity.create({
      deityName,
      slug,
      description,
      mythology,
      image,
    });

    res.status(201).json({
      success: true,
      deity,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL DEITIES
export const getDeities = async (req, res) => {
  try {
    const deities = await Deity.find().sort({ deityName: 1 });

    res.status(200).json({
      success: true,
      deities,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE DEITY
export const getSingleDeity = async (req, res) => {
  try {
    const deity = await Deity.findById(req.params.id);

    if (!deity) {
      return res.status(404).json({
        message: "Deity not found",
      });
    }

    res.status(200).json({
      success: true,
      deity,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE DEITY
export const updateDeity = async (req, res) => {
  try {
    const deity = await Deity.findByIdAndUpdate(
      req.params.id,

      req.body,

      {
        new: true,
      },
    );

    res.status(200).json({
      success: true,
      deity,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE DEITY
export const deleteDeity = async (req, res) => {
  try {
    await Deity.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Deity deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
