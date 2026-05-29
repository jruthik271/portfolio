const { z } = require('zod');
const Message = require('../models/Message');
const { sendContactEmail } = require('../services/emailService');

// Define Zod validator schema
const contactSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters long." }).max(100),
  email: z.string().trim().email({ message: "Invalid email address format." }),
  subject: z.string().trim().min(3, { message: "Subject must be at least 3 characters long." }).max(200),
  message: z.string().trim().min(10, { message: "Message must be at least 10 characters long." }).max(5000)
});

const submitContactForm = async (req, res) => {
  try {
    // 1. Validate request body against schema
    const validation = contactSchema.safeParse(req.body);
    if (!validation.success) {
      // Gather errors
      const errorMsg = validation.error.issues.map(issue => issue.message).join(' ');
      return res.status(400).json({ error: errorMsg });
    }

    const { name, email, subject, message } = validation.data;

    // 2. Save record to database
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    // 3. Dispatch emails (non-blocking so users get instant response, but catch errors)
    sendContactEmail({ name, email, subject, message })
      .catch(emailError => {
        console.error('Non-blocking contact email dispatcher encountered an error:', emailError.message);
      });

    // 4. Return success response
    return res.status(200).json({ success: true, message: 'Message recorded and sent successfully!' });
  } catch (error) {
    console.error('Contact controller error:', error);
    return res.status(500).json({ error: 'Internal server error processing contact request.' });
  }
};

module.exports = {
  submitContactForm
};
