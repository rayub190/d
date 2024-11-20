import nodemailer from "nodemailer";
import QRCode from "qrcode";

export const sendMail = async ({ email, name }) => {
  try {
    // Generate QR code
    const qrCodeData = await QRCode.toDataURL(`https://theflixertv.to/home`);
    const base64Data = qrCodeData.split("base64,")[1]; // Extract Base64 content

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "Your Email", // Replace with your email
        pass: "App Password", // Replace with your app password
      },
    });

    // Define email options
    const mailOptions = {
      from: "email", // Replace with your email
      to: email,
      subject: "Welcome to Our Platform!",
      html: `
    <h1>Welcome to Our Platform, ${name}!</h1>
    <p>Thank you for registering with us! We are excited to have you as a part of our community.</p>
    <p>Here is your unique QR code for easy access to our services:</p>
    <img src="cid:qr-code" alt="QR Code" />
    <p>Make the most of your experience by exploring our features and resources. If you have any questions or need assistance, feel free to reach out to our support team.</p>
    <p>Best regards,<br>The [Your Platform Name] Team</p>
  `,
      attachments: [
        {
          filename: "qr-code.png",
          content: base64Data,
          encoding: "base64",
          cid: "qr-code", // Content ID for the embedded image
        },
      ],
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully");
  } catch (e) {
    console.error("Error sending welcome email:", e.message);
  }
};
