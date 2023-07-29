const mongoose = require("mongoose");

var followSchema = new mongoose.Schema(
  {
    follow_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    subscriber_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

followSchema.index({ follow_id: 1, subscriber_id: 1 }, { unique: true });

module.exports = mongoose.model("follow", followSchema);
