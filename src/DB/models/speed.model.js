import mongoose from "mongoose";
const speedSchema = new mongoose.Schema(
  {
    trafficSpeed: {
      type: Number,
      required: true, 
    },
    
  },
  { timestamps: true } 
);

export const Speed = mongoose.models.Speed || mongoose.model("Speed", speedSchema);