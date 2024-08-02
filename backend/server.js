import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

dotenv.config();

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to the database
const dbConnection = () => {
  mongoose.connect(process.env.MONGO_URI, {
    dbName: 'BLOGAPP'
  })
    .then(() => {
      console.log('Database Connected');
    })
    .catch(err => {
      console.log(`SOME ERROR OCCURRED WHILE CONNECTING TO DATABASE: ${err}`);
    });
};

dbConnection();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CORS configuration (uncomment and configure if needed)
// app.use(cors({
//   origin: process.env.FRONTEND_URL,
//   methods: ["PUT", "GET", "POST", "DELETE"],
//   credentials: true,
// }));

// Serve static files
app.use(express.static(path.join(__dirname, 'client/dist')));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

// Handle any other requests (e.g., frontend SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});
