const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "USer",
    },
    toUserId: { type: mongoose.Schema.Types.ObjectId, required: true },
    status: {
      type: String,
      required: true,
      ref: "USer",
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

// connectionRequestSchema.pre("save", function () {
//   const connectionRequest = this;
//   //check if the fromUserId is same as toUserId
//   if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
//     throw new Error("Cannot send connection request to yourself");
//   }
//   next();
// });

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
