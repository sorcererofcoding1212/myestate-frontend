import { z } from "zod";

export const filterSchema = z.object({
  city: z.array(z.string()),
  postal_code: z.string().optional(),
  furnishing_status: z.array(z.string()),
  min_price: z.number().optional(),
  max_price: z.number().optional(),
  property_type: z.array(z.string()),
  bedrooms: z.array(z.number()),
  min_area: z.number().optional(),
  max_area: z.number().optional(),
});

export type FilterForm = z.infer<typeof filterSchema>;
