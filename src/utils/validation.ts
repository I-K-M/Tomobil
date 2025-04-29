export interface ValidationError {
  field: string;
  message: string;
}

export interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function validateContactForm(data: FormData): ValidationError[] {
  const errors: ValidationError[] = [];

  // Name validation
  if (!data.name) {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (data.name.length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters long' });
  } else if (data.name.length > 50) {
    errors.push({ field: 'name', message: 'Name must not exceed 50 characters' });
  }

  // Email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!data.email) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!emailRegex.test(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  // Subject validation
  if (!data.subject) {
    errors.push({ field: 'subject', message: 'Subject is required' });
  } else if (data.subject.length < 3) {
    errors.push({ field: 'subject', message: 'Subject must be at least 3 characters long' });
  } else if (data.subject.length > 100) {
    errors.push({ field: 'subject', message: 'Subject must not exceed 100 characters' });
  }

  // Message validation
  if (!data.message) {
    errors.push({ field: 'message', message: 'Message is required' });
  } else if (data.message.length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters long' });
  } else if (data.message.length > 1000) {
    errors.push({ field: 'message', message: 'Message must not exceed 1000 characters' });
  }

  return errors;
}
