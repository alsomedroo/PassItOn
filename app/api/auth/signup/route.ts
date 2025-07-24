import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await connectToDatabase();
  const { email, username,  password } = await req.json();

  const hashed = await bcrypt.hash(password, 10);

  try {
    const existingEmailUser = await User.findOne({ email });
if (existingEmailUser) {
  return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
}

const existingUsernameUser = await User.findOne({ username });
if (existingUsernameUser) {
  return NextResponse.json({ error: 'Username already taken' }, { status: 400 });
}

    const user = await User.create({ email, password: hashed });
    return NextResponse.json({ message: 'User created', user });
  } catch (err) {
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
  }
}
