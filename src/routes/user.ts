import express from 'express';
import { User } from '../models/User';
import { z } from 'zod';

const router = express.Router();

// Validation Schema
const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

// Get Users (Paginated)
router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const { rows, count } = await User.findAndCountAll({ limit, offset });
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

// Create User
router.post('/', async (req, res, next) => {
  try {
    const validatedData = userSchema.parse(req.body);
    const user = await User.create(validatedData);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

export { router as userRouter };
