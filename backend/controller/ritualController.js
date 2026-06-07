import Ritual from "../models/Ritual.js";



// CREATE RITUAL
export const createRitual = async (
  req,
  res
) => {

  try {

    const ritual =
      await Ritual.create(req.body);



    res.status(201).json({
      success: true,

      ritual,
    });

  } catch (error) {

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};



// GET ALL RITUALS
export const getRituals = async (
  req,
  res
) => {

  try {

    const rituals =
      await Ritual.find().sort({
        createdAt: -1,
      });



    res.status(200).json({
      success: true,

      rituals,
    });

  } catch (error) {

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};



// GET SINGLE RITUAL
export const getSingleRitual =
  async (req, res) => {

    try {

      const ritual =
        await Ritual.findById(
          req.params.id
        );



      if (!ritual) {

        return res.status(404).json({
          success: false,

          message:
            "Ritual not found",
        });
      }



      res.status(200).json({
        success: true,

        ritual,
      });

    } catch (error) {

      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };



// UPDATE RITUAL
export const updateRitual =
  async (req, res) => {

    try {

      const ritual =
        await Ritual.findByIdAndUpdate(
          req.params.id,

          req.body,

          {
            new: true,
          }
        );



      res.status(200).json({
        success: true,

        ritual,
      });

    } catch (error) {

      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };



// DELETE RITUAL
export const deleteRitual =
  async (req, res) => {

    try {

      await Ritual.findByIdAndDelete(
        req.params.id
      );



      res.status(200).json({
        success: true,

        message:
          "Ritual deleted successfully",
      });

    } catch (error) {

      res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  };