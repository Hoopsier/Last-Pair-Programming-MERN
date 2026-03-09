const Property = require("../models/propertyModel");
const mongoose = require("mongoose")
// GET /api/properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({})
    res.status(200).json(properties)
  }
  catch (e) {
    res.status(500).json({ message: "Failed to retrieve jobs" });
  }
};

// POST /api/properties
const createProperty = async (req, res) => {
  try {
    const newProperty = await Property.create({ ...req.body })
    res.status(201).json(newProperty)
  } catch (e) {
    res.status(401).json({
      message: "Failed to create property",
      error: `ERROR posting property: ${e}`
    })
  }
};

// GET /api/properties/:propertyId
const getPropertyById = async (req, res) => {
  try{
    if(!mongoose.Types.ObjectId.isValid(req.params.propertyId)){
      return res.status(400).json({error: "Invalid property Id"});
    }
    const property = await Property.findById(req.params.propertyId);

    if (!property){
      return res.status(404).json({error:"Property not found"})

    }
    res.status(200).json(property);

  }catch (error){
    res.status(500).json({error: error.message });
  }
 
};

// PUT /api/properties/:propertyId
const updateProperty = async (req, res) => {
  res.send("updateProperty");
};

// DELETE /api/properties/:propertyId
const deleteProperty = async (req, res) => {
   try {
    if (!mongoose.Types.ObjectId.isValid(req.params.propertyId)) {
      return res.status(400).json({ error: "Invalid property ID" });
    }

    const property = await Property.findByIdAndDelete(req.params.propertyId);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(204).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProperties,
  createProperty,
  getPropertyById,
  updateProperty,
  deleteProperty,
};
