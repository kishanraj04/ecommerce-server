import express from 'express';
import productRoute from './routes/products.Route.js';
import dotenv from 'dotenv';
import './config/dbConnection.js'
// Load environment variables
dotenv.config();

const PORT = process.env.PORT ; 
const app = express();

// middlewares
app.use(express.json())






// Product route
app.use('/api/v1', productRoute);


// global error handler
app.use((err, req, res, next) => {
     const statusCode = err.status || 500;
     console.log("err ",err.status);
     res.status(statusCode).json({
         success: false,
         message: err.message || "Internal Server Error"
     });
 });



app.listen(PORT, (err) => {
    try {
        console.log("server listen on ",PORT);
    } catch (error) {
        console.log("server crashed");
    }
});
