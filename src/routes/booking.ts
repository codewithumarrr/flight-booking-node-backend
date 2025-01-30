import express from 'express';
import { Booking } from '../models/Booking';
import { Flight } from '../models/Flight';
import { z } from 'zod';

const router = express.Router();

// Validation Schema
const bookingSchema = z.object({
  flightId: z.number().positive('Flight ID must be a positive number'),
  passengerName: z.string().min(1, 'Passenger name is required'),
  passengerEmail: z.string().email('Invalid email address'),
});

// Get Bookings (Paginated)
router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const { rows, count } = await Booking.findAndCountAll({ limit, offset });
    res.json({
      data: rows,
      meta: {
        total: count,
        page,
        lastPage: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    next(error);
  }
});

// Create Booking
router.post('/', async (req, res, next) => {
  try {
    const validatedData = bookingSchema.parse(req.body);

    // Ensure flight exists
    const flight = await Flight.findByPk(validatedData.flightId);
    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' });
    }

    const booking = await Booking.create(validatedData);
    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
});

export { router as bookingRouter };
