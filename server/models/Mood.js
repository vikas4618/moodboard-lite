const mongoose = require("mongoose");

const MoodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    emojis: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    note: {
      type: String,
      maxlength: 200,
    },
    dateOnly: {
      type: String, // e.g. "2025-11-02"
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mood", MoodSchema);
