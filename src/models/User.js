const mongoose = require("mongoose");
const { ROLES } = require("../constants/roles");

const userSchema = new mongoose.Schema(
  {
    auth0UserId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      enum: [ROLES.ARTIST, ROLES.COMPANY]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
