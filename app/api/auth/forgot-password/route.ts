export const runtime = "nodejs";

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';
import crypto from 'crypto';

export async function POST(req: Request) {
  await connectToDatabase();
  const { email } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'No user found with this email' }, { status: 404 });
  }

  // ✅ Create secure reset token (32 chars) and expiration
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenExpires = Date.now() + 1000 * 60 * 10; // 10 min expiry

  // 🔁 Save to user document (adjust if you're using a separate model)
  user.resetToken = resetToken;
  user.resetTokenExpires = resetTokenExpires;
  await user.save();

  // ✅ Send email via Brevo (SMTP)
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      auth: {
        user: process.env.BREVO_EMAIL!,
        pass: process.env.BREVO_SMTP_KEY!,
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${resetToken}&email=${email}`;

    await transporter.sendMail({
      from: `"PassItOn Support" <${process.env.BREVO_EMAIL}>`,
      to: email,
      subject: 'Reset Your Password',
      html: `
        <p>Hey 👋,</p>
        <p>You requested to reset your password. Click the link below to proceed:</p>
        <p><a href="${resetUrl}" target="_blank">Reset Password</a></p>
        <p>This link is valid for 10 minutes.</p>
        <br />
        <p>If you didn’t request this, just ignore this email.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ Failed to send reset email:', err);
    return NextResponse.json({ error: 'Email failed to send' }, { status: 500 });
  }
}
