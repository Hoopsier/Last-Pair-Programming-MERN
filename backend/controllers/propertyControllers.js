const Property = require("../models/propertyModel");

// GET /api/properties
const getAllProperties = async (req, res) => {
  res.send("getAllProperties");
};

// POST /api/properties
const createProperty = async (req, res) => {
  res.send("createProperty");
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
