const nodemailer = require('nodemailer');
const { Resend } = require('resend');

// Helper to send using Resend
const sendWithResend = async (name, email, subject, message) => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('Resend API key not configured.');
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  
  // 1. Email to the Owner
  const ownerEmail = await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>', // Resend standard onboarding sender
    to: process.env.EMAIL_USER,
    subject: `New Portfolio Contact (Resend): ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });

  // 2. Auto-reply to the Sender
  const senderEmail = await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to: email,
    subject: 'Thank you for reaching out!',
    text: `Hi ${name},\n\nThank you for contacting me. I have received your message regarding "${subject}" and will get back to you as soon as possible.\n\nBest regards,\nSumanth`,
  });

  if (ownerEmail.error || senderEmail.error) {
    throw new Error(JSON.stringify(ownerEmail.error || senderEmail.error));
  }

  console.log('Emails successfully sent via Resend API');
  return true;
};

// Helper to send using Nodemailer (SMTP Gmail fallback)
const sendWithNodemailer = async (name, email, subject, message) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Gmail SMTP credentials are not configured in environment.');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 1. Email to the Owner
  const mailToOwner = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Portfolio Contact: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  // 2. Auto-reply to the Sender
  const mailToSender = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thank you for reaching out!',
    text: `Hi ${name},\n\nThank you for contacting me. I have received your message regarding "${subject}" and will get back to you as soon as possible.\n\nBest regards,\nSumanth`,
  };

  await transporter.sendMail(mailToOwner);
  await transporter.sendMail(mailToSender);
  console.log('Emails successfully sent via Gmail SMTP Nodemailer');
  return true;
};

// Resilient Wrapper
const sendContactEmail = async ({ name, email, subject, message }) => {
  try {
    console.log('Attempting to send contact emails via Resend API...');
    return await sendWithResend(name, email, subject, message);
  } catch (resendError) {
    console.warn(`Resend API failed: ${resendError.message}. Falling back to Gmail SMTP Nodemailer...`);
    try {
      return await sendWithNodemailer(name, email, subject, message);
    } catch (nodemailerError) {
      console.error(`SMTP Nodemailer fallback failed: ${nodemailerError.message}`);
      // Throwing error indicates full failure, but we want to log it and save to DB anyway
      throw new Error(`Email delivery failed fully: ${nodemailerError.message}`);
    }
  }
};

module.exports = {
  sendContactEmail,
};
