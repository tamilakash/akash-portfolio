import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import bioRoutes from './routes/bioRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import educationRoutes from './routes/educationRoutes.js';
import seedRoutes from './routes/seedRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/bio', bioRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/seed', seedRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'T. Akash Portfolio JWT Auth MongoDB API Server Running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Express API Server running on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
});
