const express = require("express");
const router = express.Router();
const {
  getAllProperties,
  createProperty,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyControllers");

// GET /api/properties
router.get("/", getAllProperties);

// POST /api/properties
router.post("/", createProperty);

// GET /api/properties/:propertyId
router.get("/:propertyId", getPropertyById);

// PUT /api/properties/:propertyId
router.put("/:propertyId", updateProperty);

// DELETE /api/properties/:propertyId
router.delete("/:propertyId", deleteProperty);

module.exports = router;
