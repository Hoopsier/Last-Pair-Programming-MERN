const Property = require("../models/propertyModel");
const mongoose = require("mongoose")

const validateId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid property Id");
  }
}

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
  try {
    validateId(req.params.propertyId)
    const property = await Property.findById(req.params.propertyId);
    if (!property) {
      return res.status(404).json({ error: "Property not found" })
    }
    res.status(200).json(property);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

// PUT /api/properties/:propertyId
const updateProperty = async (req, res) => {
  const id = req.params.propertyId
  validateId(id)
  try {
    const updatedProperty = await Property.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
    if (updatedProperty) {
      return res.status(200).json({ message: "Updated property successfully", output: updatedProperty })
    }
    return res.status(404).json({ error: "No property to update" })
  } catch (e) {
    return res.status(500).json({ error: `ERROR updating property: ${e}` })
  }
};

// DELETE /api/properties/:propertyId
const deleteProperty = async (req, res) => {
  try {
    validateId(req.params.propertyId)
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
