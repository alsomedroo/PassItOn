'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setStatus('');

    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (res.ok) {
      setStatus('✅ Reset link sent! Check your inbox.');
    } else {
      setStatus(`❌ ${data.error || 'Something went wrong.'}`);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <motion.div
        className="bg-zinc-900 p-8 rounded-xl w-full max-w-md"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="mb-4 rounded-full"
          />
          <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        </div>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <motion.button
          onClick={handleSubmit}
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          disabled={loading || !email}
          className={`w-full py-3 rounded-lg transition font-semibold ${
            loading
              ? 'bg-blue-800 opacity-70 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
          }`}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </motion.button>

        {status && (
          <p className="mt-4 text-center text-yellow-400 text-sm">{status}</p>
        )}
      </motion.div>
    </div>
  );
}
