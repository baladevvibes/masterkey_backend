const nodemailer = require('nodemailer');

// Setup transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'masterkeynotesweb@gmail.com',
    pass: 'masterkeylearngrowth', // Not your regular password!
  },
});

// Email options
const mailOptions = {
  from: 'masterkeynotesweb@gmail.com',
  to: 'balamuruganuiux@gmail.com',
  subject: 'Test Email from Node.js',
  text: 'Hello, this is a simple test email sent using NodeMailer.',
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error:', error);
  }
  console.log('Email sent:', info.response);
});
