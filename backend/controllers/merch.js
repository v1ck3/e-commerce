import merch from "../models/merch.model.js"
const merchItem = async (req, res) => {
    
    const data = await merch.find(req.query);
    res.status(200).json(data);

}

 const getMerchById = async (req, res) => {
  try {
    const merchItem = await merch.findById(req.params.id);

    if (!merchItem) {
      return res.status(404).json({ message: "Merch not found" });
    }

    res.status(200).json(merchItem);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching merch item",
      error: error.message,
    });
  }
};

export default {merchItem, getMerchById};