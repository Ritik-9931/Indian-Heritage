import City from "../models/City.js";

export const createCity = async (req, res) => {
  try {
    const { cityName, state } = req.body;

    const slug = cityName.toLowerCase().replace(/\s+/g, "-");

    const existingCity = await City.findOne({
      cityName,
      state,
    });

    if (existingCity) {
      return res.status(400).json({
        message: "City already exists in this state",
      });
    }

    const city = await City.create({
      cityName,
      slug,
      state,
    });

    res.status(201).json({
      success: true,
      city,
    });
  } catch (error) {
    console.log("CITY CREATE ERROR:", error); // 👈 IMPORTANT
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL CITIES
export const getCities = async (req, res) => {
  try {
    const cities = await City.find().populate("state");

    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET CITIES BY STATE
export const getCitiesByState = async (req, res) => {
  try {
    const cities = await City.find({
      state: req.params.stateId,
    });

    res.status(200).json({
      success: true,
      cities,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSingleCity = async (req, res) => {
  try {
    const city = await City.findById(req.params.id).populate(
      "state",
      "stateName",
    );

    if (!city) {
      return res.status(404).json({
        message: "City not found",
      });
    }

    res.status(200).json({
      success: true,
      data: city,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createCity = async (req, res) => {
  try {
    const { cityName, state } = req.body;

    const slug = cityName.toLowerCase().replace(/\s+/g, "-");

    const existingCity = await City.findOne({
      cityName,
      state,
    });

    if (existingCity) {
      return res.status(400).json({
        message: "City already exists in this state",
      });
    }

    const city = await City.create({
      cityName,
      slug,
      state,
    });

    res.status(201).json({
      success: true,
      city,
    });
  } catch (error) {
    console.log("CITY CREATE ERROR:", error); // 👈 IMPORTANT
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL CITIES
export const getCities = async (req, res) => {
  try {
    const cities = await City.find().populate("state");

    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET CITIES BY STATE
export const getCitiesByState = async (req, res) => {
  try {
    const cities = await City.find({
      state: req.params.stateId,
    });

    res.status(200).json({
      success: true,
      cities,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSingleCity = async (req, res) => {
  try {
    const city = await City.findById(req.params.id).populate(
      "state",
      "stateName",
    );

    if (!city) {
      return res.status(404).json({
        message: "City not found",
      });
    }

    res.status(200).json({
      success: true,
      data: city,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteCity = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);

    if (!city) {
      return res.status(404).json({
        message: "City not found",
      });
    }

    await City.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "City deleted successfully",
    });
  } catch (error) {
    console.log("DELETE CITY ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateCity = async (req, res) => {
  try {
    const { cityName, state } = req.body;

    const city = await City.findById(req.params.id);

    if (!city) {
      return res.status(404).json({
        message: "City not found",
      });
    }

    // regenerate slug if name changes
    const slug = cityName
      ? cityName.toLowerCase().replace(/\s+/g, "-")
      : city.slug;

    city.cityName = cityName || city.cityName;
    city.state = state || city.state;
    city.slug = slug;

    const updatedCity = await city.save();

    res.status(200).json({
      success: true,
      city: updatedCity,
    });
  } catch (error) {
    console.log("UPDATE CITY ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
