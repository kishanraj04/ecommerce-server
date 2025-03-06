import express from "express";
import productRoute from "./routes/products.Route.js";
import dotenv from "dotenv";
import "./config/dbConnection.js";
import userRouter from "./routes/user.Route.js";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import cors from "cors";
import orderRouter from "./routes/order.Route.js";
import multer from 'multer'
import fs from 'fs'
import cartRouter from "./routes/cart.Route.js";
// Load environment variables
dotenv.config();

// handling uncaught error
process.on("uncaughtException", (err) => {
  console.log("uncaught error message :", err.message);
  process.exit(1);
});


// check wheteher the upload file is exist or not
if (!fs.existsSync("upload")) {
  fs.mkdirSync("upload");
}

// multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload"); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
    
  },
});

export const upload = multer({storage:storage})

const PORT = process.env.PORT;
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Product route
app.use("/api/v1", productRoute);

// User Route
app.use("/api/v1" , userRouter);

// Order Route
app.use("/api/v1", orderRouter);

// cart route
app.use('/api/v1',cartRouter)

// global error handler
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  if (err.name == "CastError") {
    return res.status(404).json({
      success: false,
      message: "invalid id",
    });
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const server = app.listen(PORT, (err) => {
  try {
    console.log("server listen on ", PORT);
  } catch (error) {
    console.log("server crashed");
  }
});
