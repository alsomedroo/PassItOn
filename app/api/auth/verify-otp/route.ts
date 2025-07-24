import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';
import { Otp } from '@/models/Otp';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';

export async function POST(req: Request) {
  await connectToDatabase();
  const { email, password, otp, fullName, username } = await req.json();

  const existingOtp = await Otp.findOne({ email });
  if (!existingOtp || existingOtp.otp !== otp || existingOtp.expiresAt < new Date()) {
    return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
  }

  const alreadyUser = await User.findOne({ email });
  if (alreadyUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  if (!fullName || !username) {
    return NextResponse.json({ error: 'Full name and username required' }, { status: 400 });
  }

  // Enforce unique username
  const taken = await User.findOne({ username });
  if (taken) {
    return NextResponse.json({ error: 'Username already taken' }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashed, fullName, username });
  await Otp.deleteOne({ email });

  const token = jwt.sign({ email, username, fullName }, JWT_SECRET, { expiresIn: '7d' });

  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
