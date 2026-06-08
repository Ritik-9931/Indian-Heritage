import mongoose from "mongoose";

const festivalSchema = new mongoose.Schema(
  {
    festivalName: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      require: true,
    },

    description: {
      type: String,
    },

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },

    significance: {
      type: String,
    },

    image: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Festival", festivalSchema);
