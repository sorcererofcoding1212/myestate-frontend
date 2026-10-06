import { z } from "zod";

export const propertyImageSchema = z.object({
  image: z.instanceof(File),
  tag: z.string(),
});

export const listSchema = z.object({
  property_type: z.string(),
  listing_type: z.string(),
  furnishing_status: z.string(),

  address: z
    .string()
    .max(200, { error: "Address can not exceed 200 characters" }),
  city: z.string(),
  state: z.string(),
  postal_code: z.number(),

  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  area: z.number(),
  total_floors: z.number().optional(),
  floor_number: z.number().optional(),
  balconies: z.number().optional(),
  parking_spaces: z.number().optional(),

  latitude: z.number(),
  longitude: z.number(),

  images: z
    .array(propertyImageSchema)
    .min(1, { error: "At least 5 images are required" })
    .max(10, { error: "Maximum 10 images are allowed" }),

  price: z.number(),
  description: z
    .string()
    .max(3000, { error: "Description can not exceed 3000 characters" }),
});

export type FormImage = z.infer<typeof propertyImageSchema>;
export type ListPropertyForm = z.infer<typeof listSchema>;
