import nodemailer from "nodemailer";

export const sendAppointmentOTPEmail = async (
  doctorEmail,
  otp,
  name,
  age,
  gender,
  phoneNo,
  email,
  date,
  time
) => {
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
      to: doctorEmail,
      subject: "New Appointment Request - OTP Verification Required",
      text: `You have received a new appointment request from a patient.

📋 Patient Details:
• Name   : ${name}
• Age    : ${age}
• Gender : ${gender}
• Phone  : ${phoneNo}
• Email  : ${email}
• Date   : ${date}
• Time   : ${time}

🔐 OTP for confirmation: ${otp}

Please share this OTP with the Patient to confirm the appointment.

- DocTreat Team`,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("OTP Email Send Error:", err);
  }
};
