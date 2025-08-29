
'use server';

import { z } from 'zod';
import { generatePersonProfile, type GeneratePersonProfileOutput } from './ai/flows/generate-person-profile';

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


const generateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  additionalContext: z.string().optional(),
});

interface GenerateProfileState {
  data: GeneratePersonProfileOutput | null;
  error: string | null;
}

export async function generateProfileAction(name: string, additionalContext: string): Promise<GenerateProfileState> {
  const validatedFields = generateProfileSchema.safeParse({ name, additionalContext });

  if (!validatedFields.success) {
    return { data: null, error: validatedFields.error.flatten().fieldErrors.name?.join(', ') ?? "Invalid input" };
  }
  
  try {
    const profile = await generatePersonProfile({ name: validatedFields.data.name, additionalContext: validatedFields.data.additionalContext });
    return { data: profile, error: null };
  } catch (e) {
    console.error(e);
    return { data: null, error: "Failed to generate profile. Please try again later." };
  }
}
