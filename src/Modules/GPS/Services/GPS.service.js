import { GPS } from "../../../DB/models/gps.model.js";

// Set GPS coordinates (latitude and longitude)
export const setGPS = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return res.status(400).json({ message: 'Invalid coordinates. Must be numbers.' });
    }

    let gpsDoc = await GPS.findOne();

    if (!gpsDoc) {
      gpsDoc = await GPS.create({ latitude, longitude });
      return res.status(201).json({ message: "GPS coordinates created successfully", gps: gpsDoc });
    }

    gpsDoc.latitude = latitude;
    gpsDoc.longitude = longitude;
    await gpsDoc.save();

    res.status(200).json({ message: "GPS coordinates updated successfully", gps: gpsDoc });
  } catch (error) {
    console.error("Error in setGPS:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get current GPS coordinates
export const getGPS = async (req, res) => {
  try {
    const gps = await GPS.findOne();
    if (!gps) {
      return res.status(404).json({ message: "No GPS data found" });
    }
    res.status(200).json(gps);
  } catch (error) {
    console.error("Error in getGPS:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
