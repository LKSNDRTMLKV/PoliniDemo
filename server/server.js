import app from "./app.js";
import databaseConnection from './config/database.js';
import dotenv from 'dotenv';
import cloudinaryConnection from "./config/cloudinary.js";


//Config
dotenv.config({path:'./config/.env'});

//DBConnection
databaseConnection();

//Cloudinary
cloudinaryConnection();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server up and running on http://localhost:${process.env.PORT}`);
})

// Uncaught Exception
process.on("uncaughtException", err => {
    console.log(`Error: ${err.message}`);
    console.log('Server shuting down uncaught exception');
    process.exit(1);
})

//Unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log('Server shuting down due to unhandled rejection');
    server.close(() => {
        process.exit(1);
    })
})
