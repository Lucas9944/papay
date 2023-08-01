const mongoose = require("mongoose");
const { like_view_group_list, board_id_enum_list } = require("../lib/config");

const LikeSchema = new mongoose.Schema(
  {
    mb_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    like_ref_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    like_group: {
      type: String,
      required: true,
      enum: {
        values: like_view_group_list,
      },
    },

    bo_id: {
      type: String,
      required: false,
      enum: {
        values: board_id_enum_list,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Like", LikeSchema);
