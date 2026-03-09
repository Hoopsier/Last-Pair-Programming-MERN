const express = require('express');
const cors = require('cors');
const propertyRouter = require('./routes/propertyRouter');
const userRouter = require('./routes/userRouter.js');
const { unknownEndpoint, errorHandler, requestLogger } = require('./middleware/customMiddleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api/properties', propertyRouter);
app.use('/api/users', userRouter);

// Error handling
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
