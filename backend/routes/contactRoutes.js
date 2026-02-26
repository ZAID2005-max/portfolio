const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const nodemailer = require('nodemailer'); // 1. IMPORT NODEMAILER HERE

// 2. SETUP TRANSPORTER HERE
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// POST a new message
router.post('/', async (req, res) => {
  // Basic Backend Validation
  if (!req.body.name || !req.body.email || !req.body.message) {
    return res.status(400).json({ message: 'Please fill out all fields.' });
  }

  const newMessage = new Message({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  });

  try {
    const savedMessage = await newMessage.save();

    // 3. SEND EMAIL LOGIC HERE (After saving to DB, before sending response)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `New Portfolio Message from ${req.body.name}`,
      text: `You received a new message!\n\nName: ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email error:', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(201).json({ message: 'Message sent successfully!', data: savedMessage });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;