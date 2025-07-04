import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Otp } from '@/models/Otp';
import { User } from '@/models/User';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  await connectToDatabase();
  const { email } = await req.json();

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { error: 'User already registered. Please log in.', userExists: true },
      { status: 400 }
    );
  }

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min from now
  console.log(`Generated OTP for ${email}: ${otp}`);

  // Save/update OTP in DB
  await Otp.findOneAndUpdate(
    { email },
    { otp, expiresAt },
    { upsert: true, new: true }
  );

  // Configure SMTP transport
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USER!,  // e.g. 91420c002@smtp-brevo.com
        pass: process.env.BREVO_SMTP_PASS!,  // your SMTP key
      },
    });

    // Compose email
    const mailOptions = {
      from: `"PassItOn" <${process.env.BREVO_FROM_EMAIL}>`, // must match verified sender
      to: email,
      subject: 'Your OTP Code',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Hey there 👋</h2>
          <p>Your OTP code is:</p>
          <div style="font-size: 24px; font-weight: bold; margin: 16px 0; color: #4F46E5;">${otp}</div>
          <p>This code will expire in <strong>10 minutes</strong>.</p>
          <br />
          <p>Thanks,<br/>The <strong>PassItOn</strong> Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info);
  } catch (err) {
    console.error('❌ Error sending email:', err);
    return NextResponse.json({ error: 'Failed to send OTP email' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
