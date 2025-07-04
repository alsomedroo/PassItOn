import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Otp } from '@/models/Otp';
import { User } from '@/models/User';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  await connectToDatabase();
  const { email } = await req.json();

  // ✅ Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { error: 'User already registered. Please log in.', userExists: true },
      { status: 400 }
    );
  }

  // ✅ Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // ✅ Save or update OTP in DB
  await Otp.findOneAndUpdate(
    { email },
    { otp, expiresAt },
    { upsert: true, new: true }
  );

  // ✅ Send OTP via Brevo SMTP using Nodemailer
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      auth: {
        user: process.env.BREVO_EMAIL!,
        pass: process.env.BREVO_SMTP_KEY!,
      },
    });

    const mailOptions = {
      from: `"PassItOn" <${process.env.BREVO_EMAIL}>`,
      to: email,
      subject: 'Your OTP Code',
      html: `<p>Hey there 👋,<br /><br />Your OTP code is: <strong>${otp}</strong><br /><br />This code will expire in 10 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error('❌ Error sending email:', err);
    return NextResponse.json({ error: 'Failed to send OTP email' }, { status: 500 });
  }

  // 🚨 In production, remove `otp` from the response!
  return NextResponse.json({ success: true });
}
