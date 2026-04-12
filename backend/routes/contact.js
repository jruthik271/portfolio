const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Message = require('../models/Message');

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Save to database
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    // Set up Nodemailer
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

    // Try sending emails (we don't await/block the response to the user if email fails, 
    // but here we wait to catch auth errors if password is not set)
    try {
      await transporter.sendMail(mailToOwner);
      await transporter.sendMail(mailToSender);
    } catch (emailError) {
      console.error('Email sending failed (check credentials):', emailError.message);
      // We still return success since the message was saved to DB
    }

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
