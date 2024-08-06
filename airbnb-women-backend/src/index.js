import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './db/index.js'
import userRouter from './routes/user.routes.js'
import placeRouter from './routes/place.route.js'
import bookingRouter from './routes/booking.route.js'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// creating app
const app = express()

// configure env
dotenv.config({
    path: './.env'
});

//middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({extended: true, limit: "10mb"}));
app.use(express.static('public'));
app.use(cookieParser());

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use('/uploads', express.static(__dirname+'/uploads'));

// routes
app.use('/api/user', userRouter);
app.use('/api/place', placeRouter);
app.use('/api/booking', bookingRouter);

// connecting DB
connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server is listening is PORT", process.env.PORT);
    })

    app.on('error', (error) => {
        console.log('Error while connecting to the server', error);
    })
})
.catch((error) => {
    console.log("MongoDB connection Failed!!!", error);
})

// mongoose.connect(process.env.MONGODB_URI);

// app.get('/test', (req, res) => {
//     res.json('test ok');
// }) 

// app.post('/register', (req, res) => {
//     const {name, email, password} = req.body;
//     res.json({name, email});
// })

// app.listen(process.env.PORT);