import { transporter } from "../configs/nodemailer.config.js";

export const sendVerificationEmail = async (user, token) => {
  const verifyUrl = `${process.env.BACKEND_URL}/api/auth/verify-email?token=${token}`;
  await transporter.sendMail({
    from: `"Auth App - Techerudite " <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: 'Verify Your Email',
    html: `
      <p>Hello ${user.firstName},</p>
      <p>Please click below to verify your email:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
    `,
  });
};
