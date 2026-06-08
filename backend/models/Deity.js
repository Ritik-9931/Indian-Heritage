import mongoose from "mongoose";

const deitySchema = new mongoose.Schema(
  {
    deityName: {
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

    mythology: {
      type: String,
    },

    image: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Deity", deitySchema);
