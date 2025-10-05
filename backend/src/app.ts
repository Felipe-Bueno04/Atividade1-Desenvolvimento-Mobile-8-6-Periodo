import express from 'express';
import cors from 'cors';
import { router } from './routes';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', router);

// Error handling middleware
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', error);
  
  if (error.statusCode) {
    return res.status(error.statusCode).json({
      error: error.message
    });
  }
  
  res.status(500).json({
    error: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});