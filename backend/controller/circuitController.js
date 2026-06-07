// controllers/circuitController.js

import Circuit from "../models/Circuit.js";



// CREATE CIRCUIT
export const createCircuit = async (req, res) => {
  try {

    const circuit = await Circuit.create({
      circuitName: req.body.circuitName,

      temples: req.body.temples,

      duration: req.body.duration,

      difficultyLevel:
        req.body.difficultyLevel,

      totalDistance:
        req.body.totalDistance,
    });



    res.status(201).json({
      success: true,
      circuit,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



// GET ALL CIRCUITS
export const getCircuits = async (req, res) => {
  try {

    const circuits = await Circuit.find()

      .populate("temples")

      .sort({ circuitName: 1 });



    res.status(200).json({
      success: true,
      circuits,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



// GET SINGLE CIRCUIT
export const getSingleCircuit = async (
  req,
  res
) => {
  try {

    const circuit = await Circuit.findById(
      req.params.id
    )

    .populate("temples");



    if (!circuit) {
      return res.status(404).json({
        message: "Circuit not found",
      });
    }



    res.status(200).json({
      success: true,
      circuit,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



// UPDATE CIRCUIT
export const updateCircuit = async (
  req,
  res
) => {
  try {

    const circuit =
      await Circuit.findByIdAndUpdate(
        req.params.id,

        req.body,

        {
          new: true,
        }
      );



    res.status(200).json({
      success: true,
      circuit,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



// DELETE CIRCUIT
export const deleteCircuit = async (
  req,
  res
) => {
  try {

    await Circuit.findByIdAndDelete(
      req.params.id
    );



    res.status(200).json({
      success: true,
      message: "Circuit deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};