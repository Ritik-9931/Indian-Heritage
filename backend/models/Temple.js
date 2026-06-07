import mongoose from "mongoose";

const templeSchema = new mongoose.Schema(
  {
    templeName: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
    },

    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },

    address: {
      type: String,
      trim: true,
    },

    location: {
      latitude: Number,
      longitude: Number,
    },

    deity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deity",
    },

    festivals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Festival",
      },
    ],

    rituals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ritual",
      },
    ],

    pilgrimageCircuits: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Circuit",
      },
    ],

    history: String,
    significance: String,
    architecture: String,

    darshanTimings: {
      morning: String,
      evening: String,
    },

    visitorInfo: {
      dressCode: String,
      photographyAllowed: Boolean,
      entryFee: String,
    },

    images: [
      {
        url: String,
        public_id: String,
      },
    ],

    ratings: {
      average: {
        type: Number,
        default: 0,
      },

      totalReviews: {
        type: Number,
        default: 0,
      },
    },

    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },

        comment: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Temple", templeSchema);
