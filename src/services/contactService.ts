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
    // Check environment first, fall back to your active Formspree ID: 'mkoajzrv'
    const formspreeId = import.meta.env.VITE_FORMSPREE_ID || 'mkoajzrv';
    const apiUrl = import.meta.env.VITE_API_URL;

    // 1. Submit directly via client-side fetch to Formspree (completely serverless)
    if (formspreeId) {
      try {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          return { success: true, message: 'Thank you! Your message was sent successfully.' };
        }
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to send message via Formspree.');
      } catch (e: any) {
        console.error('Formspree submission error:', e);
        throw new Error(e.message || 'Failed to submit form to Formspree. Please try again later.');
      }
    }

    // 2. If a custom API URL is defined, fall back to backend API
    if (apiUrl) {
      return apiFetch<ContactFormResponse>('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    }

    // 3. Fallback Sandbox Mode
    console.info('Contact form submitted in serverless sandbox mode.');
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      message: 'Simulated submission successful!',
    };
  },
};
