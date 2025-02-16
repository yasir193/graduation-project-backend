import { Status } from "../../../DB/models/status.model.js";



export const setStatus = async (req, res) => {
  try {
    let { status } = req.body;

    // Validate the input
    if (!status || typeof status !== 'string') {
      return res.status(400).json({ message: 'Invalid status value. Status must be a non-empty string.' });
    }

    // Normalize the status (trim and convert to lowercase)
    status = status.toLowerCase().trim();

    // Check if the status field exists in any document
    const existingStatus = await Status.findOne({});

    if (!existingStatus) {
      // If no document exists, create a new one with the status field
      await Status.create({ status });
      res.status(201).json({
        message: "Status field created and set successfully!",
        status,
      });
    } else {
      // If the document exists, update the status field
      existingStatus.status = status;
      await existingStatus.save();

      res.status(200).json({
        message: "Status updated successfully!",
        status,
      });
    }
  } catch (error) {
    console.error("Error in setStatus:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};


export const getStatus = async (req, res) =>{
  try {
        const statusOfDriver  = await Status.findOne()
        res.status(200).json({statusOfDriver})
      } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal server error' , error})
        
      }
}
