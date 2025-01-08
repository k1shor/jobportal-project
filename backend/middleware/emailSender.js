const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const sendEmailToUser = async (from, userEmail, subject, textContent, htmlContent) => {
    const mailOptions = {
        from: from,  // Sender email address (use environment variable for security)
        to: userEmail,                 // Recipient's email address (user's email)
        subject: subject,              // Subject of the email
        text: textContent,             // Plain text content
        html: htmlContent              // HTML content (optional)
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmailToUser