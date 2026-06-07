import State from "../models/State.js";

export const createState = async (req, res) => {
  try {
    const state = await State.create(req.body);
    res.status(201).json(state);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStates = async (req, res) => {
  try {
    const states = await State.find();

    res.status(200).json({
      success: true,
      states,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleState = async (req, res) => {
  try {
    const state = await State.findById(req.params.id);

    if (!state) {
      return res.status(404).json({
        message: "State not found",
      });
    }

    res.status(200).json({
      success: true,
      data: state,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateState = async (req, res) => {
  try {
    const { stateName, description } = req.body;

    const state = await State.findById(req.params.id);

    if (!state) {
      return res.status(404).json({
        message: "State not found",
      });
    }

    const slug = stateName
      ? stateName.toLowerCase().replace(/\s+/g, "-")
      : state.slug;

    state.stateName = stateName || state.stateName;
    state.description = description || state.description;
    state.slug = slug;

    const updated = await state.save();

    res.status(200).json({
      success: true,
      state: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteState = async (req, res) => {
  try {
    const state = await State.findById(req.params.id);

    if (!state) {
      return res.status(404).json({
        message: "State not found",
      });
    }

    await State.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "State deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
