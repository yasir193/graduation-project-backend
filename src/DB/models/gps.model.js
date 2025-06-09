import mongoose from "mongoose";

const gpsSchema = new mongoose.Schema(
  {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

export const GPS = mongoose.models.GPS || mongoose.model("GPS", gpsSchema);
