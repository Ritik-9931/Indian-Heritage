import mongoose from "mongoose";

const stateSchema = new mongoose.Schema(
  {
    stateName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("State", stateSchema);