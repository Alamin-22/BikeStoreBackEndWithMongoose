import { Types } from 'mongoose';
import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  product: z
    .string() // first it check the id if its string
    .refine((val) => Types.ObjectId.isValid(val), {
      // if string then it check the types of provided string
      message: 'Invalid product ID format',
    })
    .transform((val) => new Types.ObjectId(val)), // Convert that string to ObjectId format to support Mongodb
  quantity: z
    .number()
    .min(1, { message: 'Quantity must be at least 1' })
    .max(5, { message: 'Quantity cannot exceed 5' }),
  totalPrice: z
    .number()
    .min(0, { message: 'Total price must be a positive number' }),
});

export default orderValidationSchema;
