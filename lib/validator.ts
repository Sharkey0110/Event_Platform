import * as z from 'zod';
//the zod schema that allows to to have rules on the data/validation, extremely useful

export const EventFormSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(3, 'Description must be at least 3 characters').max(400, 'Description must be less than 400 characters'),
    location: z.string().min(3, 'Location must be at least 3 characters').max(400, 'Location must be less than 400 characters'),
    imageUrl: z.string().url(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    categoryId: z.string(),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url()
})