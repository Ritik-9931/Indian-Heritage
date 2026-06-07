import mongoose from "mongoose";

const ritualSchema = new mongoose.Schema(
  {
    ritualName: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    description: {
      type: String,
    },

    timing: {
      type: String,
    },

    importance: {
      type: String,
    },

    associatedTemples: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Temple",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Ritual", ritualSchema);