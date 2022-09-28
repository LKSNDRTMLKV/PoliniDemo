import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import errorMiddleware from './middleware/errorMiddleware.js';
import routes from './routes/routes.js';
import path from "path";



const { product, user, order, payment, subscription } = routes;

const app = express();

// const __dirname = path.resolve();

//Config
if (process.env.NODE_ENV !== 'PRODUCTION') {
    dotenv.config({ path: './config/.env' });
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({
    origin: [process.env.API_LOCAL_PRODUCTION, process.env.BASE_URL],
    credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Routes
app.use(product);
app.use(user);
app.use(order);
// app.use('/app', payment);
app.use(subscription);

// app.use(express.static(path.join(__dirname, "../client/build")));

// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
// })


// Error Handling
app.use(errorMiddleware);

export default app;