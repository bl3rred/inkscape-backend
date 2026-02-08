const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema(
  {
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    originalFilename: {
      type: String,
      required: true,
      trim: true
    },
    mimeType: {
      type: String,
      default: "application/octet-stream"
    },
    sizeBytes: {
      type: Number,
      required: true,
      min: 0
    },
    sha256Hash: {
      type: String,
      required: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Artwork", artworkSchema);
