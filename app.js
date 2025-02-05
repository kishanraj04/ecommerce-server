import express from 'express';
import productRoute from './routes/products.Route.js';
import dotenv from 'dotenv';
import './config/dbConnection.js'
import userRouter from './routes/user.Route.js';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt'
// Load environment variables
dotenv.config();



// handling uncaught error
process.on('uncaughtException',(err)=>{
    console.log("uncaught error message :",err.message);
    process.exit(1)
})


const PORT = process.env.PORT ; 
const app = express();

// middlewares
app.use(express.json())
app.use(cookieParser())

// Product route
app.use('/api/v1', productRoute);


// User Route
app.use('/api/v1',userRouter)

// global error handler
app.use((err, req, res, next) => {
     const statusCode = err.status || 500;
     if(err.name=='CastError')
     {
        
       return res.status(404).json({
            success: false,
            message: "invalid id"
        });
     }

     res.status(statusCode).json({
         success: false,
         message: err.message || "Internal Server Error"
     });
 });



const server = app.listen(PORT, (err) => {
    try {
        console.log("server listen on ",PORT);
    } catch (error) {
        console.log("server crashed");
    }
});

