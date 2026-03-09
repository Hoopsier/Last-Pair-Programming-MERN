# Activity — Part 1 (Without Authentication)

## Introduction

- In this activity, we will build a full-stack application **without authentication**. Additionally, we will write **API Tests**.

- Approach this task **iteratively** for structured development:  
  - **Iteration 1:** Adding and Fetching properties (POST & GET all)  
  - **Iteration 2:** Reading and Deleting a Single property (GET by ID & DELETE)  
  - **Iteration 3:** Updating a property (PUT)
  - **Iteration 4:** Writing **API Tests**

> Later, during Part 2, we will add **user administration** and **protect** the routes. 

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


## Setup

- Clone [the starter repository](https://github.com/tx00-resources-en/w8-pair-prog) into a separate folder.

---

## Deliverables

1. **Code** for **API V1** (*without* authentication)  
2. **Code** for **Frontend V1** (*without* authentication) 
3. Backend **tests** for API V1  

---

## Data Model

Here's the Property schema:  

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

---

## Activity Checklist

### Iterations
- [ ] **Iteration 1:** Added and fetched properties  
- [ ] **Iteration 2:** Read and deleted a single property  
- [ ] **Iteration 3:** Updated a property  
- [ ] **Iteration 4:** Wrote API tests  


### Commit Format
- [ ] Used the correct commit format, e.g.:  
  - `[iter1] feat(properties): implement POST /api/properties to create a new property`
  - `[iter1] feat(properties): implement GET /api/properties to fetch all properties`
  - `[iter2] feat(properties): implement GET /api/properties/:id to fetch a single property`
  - `[iter2] feat(properties): implement DELETE /api/properties/:id to delete a property`
  - `[iter3] feat(properties): implement PUT /api/properties/:id to update a property`
  - `[iter4] test(properties): add API tests for properties CRUD`

### Collaboration
- [ ] Worked on **one branch only**  
- [ ] Alternated **driver/navigator roles** after each iteration  

### Deliverables
- [ ] Code for **API V1** (*without authentication*)  
- [ ] Code for **Frontend V1** (*without authentication*)  
- [ ] Backend **tests** for API V1  


