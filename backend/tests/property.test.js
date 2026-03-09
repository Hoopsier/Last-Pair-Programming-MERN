const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Property = require("../models/propertyModel");
const config = require("../utils/config");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const properties = [
  {
    title: "zxc",
    type: "zxc",
    description: "zxc",
    price: 123,
    location: {
      address: "zxc",
      city: "zxc",
      state: "zxc"
    },
    squareFeet: 123,
    yearBuilt: 123,
    bedrooms: 123
  },
  {
    title: "zxc2",
    type: "zxc2",
    description: "zxc2",
    price: 123123412,
    location: {
      address: "zxc",
      city: "zxc",
      state: "zxc"
    },
    squareFeet: 123,
    yearBuilt: 123,
    bedrooms: 123
  }
];

const testProperty = properties[1];
async function getToken() {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("asd", 10);
  await User.create({
    name: "asd",
    email: "axsxzd@asd.asd",
    password: passwordHash,
    phoneNumber: "123", // Contact phone number
    profilePicture: "asd", // URL of the user's profile picture
    gender: "Female", // Gender of the user
    dateOfBirth: "1996-12-11", // User's birth date
    role: "user", // User role
    address: {
      street: "asd", // Street address
      city: "asd", // City
      state: "asd", // State or region
      zipCode: "123" // Postal/ZIP code
    }
  });
  const loginResponse = await api
    .post("/api/users/login")
    .send({
      email: "axsxzd@asd.asd",
      password: "asd"
    });
  return loginResponse.body.token;
}
beforeAll(async () => {
  await mongoose.connect(config.MONGO_URI);
});

beforeEach(async () => {
  await Property.deleteMany({});
  await Property.insertMany(properties);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /api/properties", () => {

  it("returns all properties", async () => {
    const response = await api
      .get("/api/properties")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(properties.length);
  });

  it("returns a single property by id", async () => {
    const property = await Property.findOne({ title: properties[1].title });

    const response = await api
      .get(`/api/properties/${property._id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.title).toBe(properties[1].title);
    expect(response.body.type).toBe(properties[1].type);
    expect(response.body.description).toBe(properties[1].description);
    expect(response.body.price).toBe(properties[1].price);
  });

});

describe("POST /api/properties", () => {

  it("creates property when authenticated", async () => {
    const token = await getToken();

    const response = await api
      .post("/api/properties")
      .set("Authorization", `Bearer ${token}`)
      .send(testProperty)
      .expect(201);

    expect(response.body.title).toBe(testProperty.title);

    const propertiesInDb = await Property.find({});
    expect(propertiesInDb).toHaveLength(3);
  });

  it("returns 401 without token", async () => {
    await api
      .post("/api/properties")
      .send(testProperty)
      .expect(401);
  });

  it("returns 401 with invalid token", async () => {
    await api
      .post("/api/properties")
      .set("Authorization", "Bearer invalidtoken123")
      .send(testProperty)
      .expect(401);
  });

});

describe("PUT /api/properties/:id", () => {

  it("updates property when authenticated", async () => {
    const token = await getToken();
    const property = await Property.findOne({});

    const updatedData = {
      title: "Updated Apartment",
      price: 300000
    };

    const response = await api
      .put(`/api/properties/${property._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedData)
      .expect(200);

    expect(response.body.title).toBe(updatedData.title);
    expect(response.body.price).toBe(updatedData.price);
  });

  it("returns 401 without token", async () => {
    const property = await Property.findOne({});

    await api
      .put(`/api/properties/${property._id}`)
      .send({ title: "Should Not Update" })
      .expect(401);
  });

});

describe("DELETE /api/properties/:id", () => {

  it("deletes property when authenticated", async () => {
    const token = await getToken();
    const property = await Property.findOne({});

    await api
      .delete(`/api/properties/${property._id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const propertiesInDb = await Property.find({});
    expect(propertiesInDb).toHaveLength(1);
  });

  it("returns 401 without token", async () => {
    const property = await Property.findOne({});

    await api
      .delete(`/api/properties/${property._id}`)
      .expect(401);

    const propertiesInDb = await Property.find({});
    expect(propertiesInDb).toHaveLength(2);
  });

});
