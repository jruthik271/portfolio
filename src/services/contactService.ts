import { apiFetch } from './api';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
}

export const contactService = {
  submitMessage: async (data: ContactFormData): Promise<ContactFormResponse> => {
    return apiFetch<ContactFormResponse>('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
};
