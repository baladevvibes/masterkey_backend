const nodemailer = require("nodemailer");
// const fs = require("fs");
// const path = require("path");
// const dotenv = require("dotenv");

// const emailTemplate = fs.readFileSync(path.join(__dirname, 'lead-template.html'), 'utf-8');
// // Fill in the template
// function fillTemplate(template, data) {
//     return template
//         .replace("{{name}}", data.name)
//         .replace("{{book}}", data.book || "N/A")
// }

// Setup transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASSKEY,
    },
});

// Main function
const sendStatusMail = async (data) => {

    const mailOptions = {
        from: process.env.EMAIL,
        to: `${data.email}`,
        subject: `${data.status}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #4CAF50;">${data.name}!</h2>
          <p>We appreciate your support and interest in ${data.book}.</p>
          <p>If you have any questions, feel free to reach out to us.</p>
          <br>
          <p>Best regards,</p>
          <p><strong>Your Masterkeynotes</strong></p>
        </div>
  `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent:");
    } catch (err) {
        console.error("Error sending email:", err);
    }
};

module.exports = sendStatusMail;

