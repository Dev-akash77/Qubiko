import nodemailer from "nodemailer";
// ! creat transporter
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// ! sending email
export const sendEmail = async (to, subject, text, html = null) => {
    try {
      const mailOptions = {
        from: process.env.SENDRE_EMAIL,
        to,
        subject,
        text,
      };
  
      if (html) {
        mailOptions.html = html;
      }
  
      const info = await transporter.sendMail(mailOptions);
      return info;
    } catch (err) {
      console.error("Error sending email:", err);
      throw new Error("Email not sent");
    }
  };
