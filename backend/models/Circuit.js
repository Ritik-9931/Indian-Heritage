import mongoose from "mongoose";

const circuitSchema = new mongoose.Schema(
  {
    circuitName: {
      type: String,
      required: true,
      trim: true,
    },

    temples: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Temple",
      },
    ],

    duration: {
      type: String,
    },

    difficultyLevel: {
      type: String,
    },

    totalDistance: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Circuit", circuitSchema);
