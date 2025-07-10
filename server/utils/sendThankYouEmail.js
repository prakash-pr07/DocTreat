import nodemailer from "nodemailer";

export const sendThankYouEmail = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"DocTreat" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to DocTreat Premium",
      text: "Thank you for becoming a Premium Member of DocTreat. You now have full access to doctor profiles and premium features.",
    };

    await transporter.sendMail(mailOptions);
    console.log("Thank you email sent successfully to", email);
  } catch (error) {
    console.error("Failed to send thank-you email:", error.message);
  }
};

