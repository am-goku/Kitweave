import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendOTPEmail(email: string, otp: string, type: 'signup' | 'reset') {
    const subject = type === 'signup' ? 'Verify Your Email - KitWeaver' : 'Reset Your Password - KitWeaver';
    const message = type === 'signup'
        ? `Your verification code is: <strong>${otp}</strong><br><br>This code will expire in 10 minutes.`
        : `Your password reset code is: <strong>${otp}</strong><br><br>This code will expire in 10 minutes.`;

    await transporter.sendMail({
        from: process.env.SMTP_FROM || 'noreply@kitweaver.ai',
        to: email,
        subject,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">${subject}</h2>
        <p style="font-size: 16px; color: #666;">${message}</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #4f46e5;">${otp}</span>
        </div>
        <p style="font-size: 14px; color: #999;">If you didn't request this, please ignore this email.</p>
      </div>
    `,
    });
}
