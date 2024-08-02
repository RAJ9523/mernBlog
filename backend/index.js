import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

import cors from "cors";

dotenv.config();



const dbConnection =() => {
    mongoose.connect(process.env.MONGO_URI,{
  
     dbName:"BLOGAPP"
    }).then(()=>{
       console.log("Database Connected");
    }).catch((err)=>{
  
        console.log(`SOME ERROR OCCURED WHILE CONNECTING TO DATABASE:${err}`);
     })
  }
  
  dbConnection();

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods:["PUT","GET","POST","DELETE"],
    credentials:true,
}));;
app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});


app.use(express.urlencoded({
    extended:true
  }));
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});