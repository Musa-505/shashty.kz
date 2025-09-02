
'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormState = {
    message: string;
    errors?: {
        name?: string[];
        email?: string[];
        message?: string[];
    }
}

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error: Please check your input.',
    };
  }

  // In a real app, you would send this data somewhere (e.g., email, database)
  console.log('Contact form submitted:');
  console.log(validatedFields.data);

  return { message: 'Thank you for your message! We will get back to you soon.', errors: {} };
}
