import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Otp } from '@/models/Otp';
import { User } from '@/models/User';

export async function POST(req: Request) {
  await connectToDatabase();
  const { email, mode = "signup", username } = await req.json();

  if (mode === "signup") {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already registered. Please log in.', userExists: true },
        { status: 400 }
      );
    }
    if (username) {
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return NextResponse.json(
          { error: 'Username already taken. Please choose another one.', usernameExists: true },
          { status: 400 }
        );
      }
    }
  } else if (mode === "reset") {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found.' },
        { status: 400 }
      );
    }
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

  await Otp.findOneAndUpdate(
    { email },
    { otp, expiresAt },
    { upsert: true, new: true }
  );

  const MSG91_API = 'https://control.msg91.com/api/v5/email/send';

  const {
    MSG91_AUTHKEY,
    MSG91_TEMPLATE_ID,
    MSG91_FROM_EMAIL,
    MSG91_DOMAIN,
    MSG91_VARIABLE_OTP,
    MSG91_VARIABLE_COMPANY_NAME,
    MSG91_COMPANY_NAME,
  } = process.env;

  if (
    !MSG91_AUTHKEY ||
    !MSG91_TEMPLATE_ID ||
    !MSG91_FROM_EMAIL ||
    !MSG91_DOMAIN ||
    !MSG91_VARIABLE_OTP ||
    !MSG91_VARIABLE_COMPANY_NAME ||
    !MSG91_COMPANY_NAME
  ) {
    //console.error('Missing MSG91 configuration in .env');
    return NextResponse.json({ error: 'Missing MSG91 config' }, { status: 500 });
  }

  const body = {
    recipients: [
      {
        to: [{ email }],
        variables: {
          [MSG91_VARIABLE_OTP!]: otp,
          [MSG91_VARIABLE_COMPANY_NAME!]: MSG91_COMPANY_NAME!,
        },
      },
    ],
    from: { email: MSG91_FROM_EMAIL },
    domain: MSG91_DOMAIN,
    template_id: MSG91_TEMPLATE_ID,
  };

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    authkey: MSG91_AUTHKEY!,
  };

  //onsole.log('Sending MSG91 email:', JSON.stringify(body, null, 2));

  const msgRes = await fetch(MSG91_API, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  const msgJson = await msgRes.json();

  //console.log('MSG91 response:', msgJson);

  if (!msgRes.ok) {
    //console.error('MSG91 Error:', msgJson);
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
