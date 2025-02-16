import { Speed } from './../../../DB/models/speed.model.js';

export const setSpeed = async (req, res) => {
  try {
    const { trafficSpeed } = req.body;

    // Validate the input
    if (typeof trafficSpeed !== 'number') {
      return res.status(400).json({ message: 'Invalid speed value. Speed must be a number.' });
    }

    // Check if the trafficSpeed field exists in any document
    const existingSpeed = await Speed.findOne({ trafficSpeed: { $exists: true } });

    if (!existingSpeed) {
      // If the field doesn't exist, create it
      await Speed.create({ trafficSpeed });
      res.status(201).json({ 
        message: "Speed field created and set successfully!", 
        trafficSpeed 
      });
    } else {
      // If the field exists, update it
      existingSpeed.trafficSpeed = trafficSpeed;
      await existingSpeed.save();

      res.status(200).json({ 
        message: "Speed updated successfully!", 
        trafficSpeed 
      });
    }
  } catch (error) {
    console.error("Error in setSpeed:", error);
    res.status(500).json({ 
      message: "Internal server error", 
      error: error.message 
    });
  }
};


export const getSpeed = async (req, res) =>{
  try {
        const trafficSpeed  = await Speed.findOne()
        res.status(200).json(trafficSpeed)
      } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal server error' , error})
        
      }
}
