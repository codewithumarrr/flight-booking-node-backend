import express from 'express';
import { Flight } from '../models/Flight';
import { z } from 'zod';

const router = express.Router();

// Validation Schema
const flightSchema = z.object({
  name: z.string().min(1, 'Flight name is required'),
  departure: z.string().min(1, 'Departure location is required'),
  arrival: z.string().min(1, 'Arrival location is required'),
  price: z.number().positive('Price must be a positive number'),
});

// Get Flights (Paginated)
router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const { rows, count } = await Flight.findAndCountAll({ limit, offset });
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

// Create Flight
router.post('/', async (req, res, next) => {
  try {
    const validatedData = flightSchema.parse(req.body);
    const flight = await Flight.create(validatedData);
    res.status(201).json(flight);
  } catch (error) {
    next(error);
  }
});

export { router as flightRouter };
