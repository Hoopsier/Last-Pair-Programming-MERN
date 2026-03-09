const Property = require("../models/propertyModel");

// GET /api/properties
const getAllProperties = async (req, res) => {
  const properties = Property.find({})
  res.status(200).json(properties)
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
  res.send("getPropertyById");
};

// PUT /api/properties/:propertyId
const updateProperty = async (req, res) => {
  res.send("updateProperty");
};

// DELETE /api/properties/:propertyId
const deleteProperty = async (req, res) => {
  res.send("deleteProperty");
};

module.exports = {
  getAllProperties,
  createProperty,
  getPropertyById,
  updateProperty,
  deleteProperty,
};
