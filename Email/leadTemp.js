const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");


// // Read the HTML template
// const emailTemplate = fs.readFileSync(
//   path.join(__dirname, "templates", "lead-template.html"),
//   "utf-8"
// );
// Load the HTML template once
const emailTemplate = fs.readFileSync(path.join(__dirname, 'lead-template.html'), 'utf-8');
// Fill in the template
function fillTemplate(template, data) {
  return template
    .replace("{{leadNumber}}", data.leadNumber)
    .replace("{{name}}", data.name)
    .replace("{{email}}", data.email)
    .replace("{{phone}}", data.phone)
    .replace("{{book}}", data.book || "N/A")
    .replace("{{city}}", data.city || "N/A");
}

// Setup transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAILPASSKEY,
  },
});

// Main function
const sendLeadMail = async (data) => {
  const html = fillTemplate(emailTemplate, data);

  const mailOptions = {
    from: process.env.EMAIL,
    to: "masterkeynotesweb@gmail.com",
    subject: `New Lead Received: ${data.leadNumber}`,
    html: html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent:", data.leadNumber);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

module.exports = sendLeadMail;

