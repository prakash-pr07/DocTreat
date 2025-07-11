import nodemailer from "nodemailer";

export const sendConfirmationEmails = async (patientEmail, doctorEmail, details) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const content = `
Appointment Confirmed 🎉

Name: ${details.patientName}
Age: ${details.age}
Gender: ${details.gender}
Phone: ${details.phoneNo}
Email: ${details.email}
Date: ${details.date}
Time: ${details.time}
`;

    await transporter.sendMail({
      from: `"DocTreat" <${process.env.EMAIL_USER}>`,
      to: patientEmail,
      subject: "Appointment Confirmed",
      text: content,
    });

    await transporter.sendMail({
      from: `"DocTreat" <${process.env.EMAIL_USER}>`,
      to: doctorEmail,
      subject: "New Patient Appointment Confirmed",
      text: content,
    });
  } catch (err) {
    console.error("Confirmation Email Error:", err);
  }
};
