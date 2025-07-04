import nodemailer from "nodemailer";

async function sendTestMail() {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: "91420c002@smtp-brevo.com",
      pass: "7Q1UaCwIZRvsT4Gh"
    }
  });

  const info = await transporter.sendMail({
    from: '"Test" <aadijain363@gmail.com>',
    to: "aadijain363@gmail.com",
    subject: "Test Email from Node",
    html: "<b>This is a test email.</b>",
  });

  console.log("✅ Email sent:", info);
}

sendTestMail().catch(console.error);
