import express from 'express';
import rateLimit from 'express-rate-limit';
import { sequelize } from './models';
import { errorHandler } from './middlewares/errorHandler';
import { flightRouter } from './routes/flight';
import { bookingRouter } from './routes/booking';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});
app.use(limiter);

// Routes
app.use('/api/flights', flightRouter);
app.use('/api/bookings', bookingRouter);

// Global Error Handler
app.use(errorHandler);

// Start Server
sequelize.sync({ force: false }).then(() => {
  console.log('Database connected');
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
