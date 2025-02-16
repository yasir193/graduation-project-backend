import mongoose from "mongoose";
const statusSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["drowsiness", "awake"], // Define the enum values
      required: true, // Make the status field required (optional but recommended)
    },
    // ... other fields in your schema if any
  },
  { timestamps: true } // Corrected typo: timestamps (plural)
);

export const Status = mongoose.models.Status || mongoose.model("Status", statusSchema);