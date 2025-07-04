import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  await connectToDatabase();
  const { email, token, password } = await req.json();

  if (!email || !token || !password) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const user = await User.findOne({ email });

  if (!user || !user.resetToken || !user.resetTokenExpires) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
  }

  // Check token match
  if (user.resetToken !== token) {
    return NextResponse.json({ error: 'Invalid reset token' }, { status: 400 });
  }

  // Check expiry
  if (Date.now() > user.resetTokenExpires) {
    return NextResponse.json({ error: 'Reset token has expired' }, { status: 400 });
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update user
  user.password = hashedPassword;
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;
  await user.save();

  return NextResponse.json({ success: true });
}
