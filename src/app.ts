// Imports
import express from "express";
import * as middlewares from "./config/middleware";
import * as database from "./config/database";
import * as routes from "./config/routes";
import * as cloudinary from "./config/cloudinary";
// import errorHandler from "./middlewares/error.handler";

// Initialization
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Connect to the database
database.configure();

// Connect to the cloudinary (images)
cloudinary.cloudinaryConfig();

// Middlewares
middlewares.configure(app);

// Routes
routes.register(app);

// Error Handler
// app.use(errorHandler);

export default app;

// ADD LOGGERS
