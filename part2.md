# Activity — Part 2 (With Authentication)

## Introduction

In this activity, we will add **user administration** and **protect** the routes from Part 1. Additionally, we will write **API Tests**.

Approach this task **iteratively** for structured development:
  - **Iteration 5:** Add user authentication (signup & login)
  - **Iteration 6:** Protect property routes (require JWT token)
  - **Iteration 7:** Write **API Tests** (covering authentication and protected routes)

---

## Important

1. **Commit Format** — use this commit format:

   ```bash
   git add .
   git commit -m "[iterX] Your commit message"
   git push
   ```

2. We will use only one branch and alternate the driver/navigator role after each iteration.

---

## Deliverables

1. **Code** for **API V2** (*with* authentication)  
2. **Code** for **Frontend V2** (*with* authentication)  
3. Backend **tests** for API V2, explicitly covering **authentication** and **protected routes**

---

## Data Models

### Property Model (same as Part 1)

```javascript
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true }, // Short, descriptive name of the property
  type: { type: String, required: true }, // Property type, e.g., Apartment, House, Commercial
  description: { type: String, required: true }, // Detailed description of the property
  price: { type: Number, required: true }, // Cost of the property in relevant currency
  location: {
    address: { type: String, required: true }, // Street address of the property
    city: { type: String, required: true }, // City where the property is located
    state: { type: String, required: true }, // State or region of the property
  },
  squareFeet: { type: Number, required: true }, // Total area of the property in square feet
  yearBuilt: { type: Number, required: true }, // Year the property was constructed
  bedrooms: { type: Number, required: true }, // Number of bedrooms in the property
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
```

### User Model

```js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true }, // Full name of the user
    email: { type: String, required: true, unique: true }, // User email for login
    password: { type: String, required: true }, // Hashed password for authentication
    phoneNumber: { type: String, required: true }, // Contact phone number
    profilePicture: { type: String, required: false }, // URL of the user's profile picture
    gender: { type: String, required: false }, // Gender of the user
    dateOfBirth: { type: Date, required: true }, // User's birth date
    role: { type: String, required: true, enum: ['admin', 'user', 'moderator'], default: 'user' }, // User role
    address: {
      street: { type: String, required: true }, // Street address
      city: { type: String, required: true }, // City
      state: { type: String, required: true }, // State or region
      zipCode: { type: String, required: true }, // Postal/ZIP code
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
```

---

## Activity Checklist

### Iterations
- [ ] **Iteration 5:** Added user authentication  
- [ ] **Iteration 6:** Protected routes  
- [ ] **Iteration 7:** Wrote API tests (covering authentication and protected routes)  

### Commit Format
- [ ] Used the correct commit format, e.g.:  
  - `[iter5] feat(users): implement POST /api/users/signup to register a new user`
  - `[iter5] feat(users): implement POST /api/users/login to authenticate a user`
  - `[iter6] feat(properties): protect property routes with authentication middleware`
  - `[iter7] test(auth): add API tests for authentication and protected routes`

### Collaboration
- [ ] Worked on **one branch only**  
- [ ] Alternated **driver/navigator roles** after each iteration  

### Deliverables
- [ ] **Code** for **API V2** (*with authentication*)  
- [ ] **Code** for **Frontend V2** (*with authentication*)  
- [ ] Backend **tests** for API V2 (explicitly covering authentication and protected routes)  


