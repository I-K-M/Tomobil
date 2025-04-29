import type { APIRoute } from 'astro';
import { validateContactForm, type FormData } from '../../utils/validation';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data: FormData = {
      name: (formData.get('name') as string) || '',
      email: (formData.get('email') as string) || '',
      subject: (formData.get('subject') as string) || '',
      message: (formData.get('message') as string) || '',
    };

    // Validate the form data
    const errors = validateContactForm(data);
    if (errors.length > 0) {
      return new Response(JSON.stringify({
        success: false,
        errors,
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Here you would typically send an email using a service like SendGrid, AWS SES, etc.
    // For now, we'll just log the data and return a success response
    console.log('Form submission:', data);

    return new Response(JSON.stringify({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error processing form:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'There was an error processing your request. Please try again later.',
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
