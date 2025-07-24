'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { LockKeyhole, MailCheck, Loader2, KeyRound } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  // Password reset states
  const [forgotOpen, setForgotOpen] = useState(false);
  const [resetStep, setResetStep] = useState<'enter' | 'verify' | 'set'>('enter');
  const [resetEmail, setResetEmail] = useState('');
  const [resetOtp, setResetOtp] = useState('');
  const [resetNewPwd, setResetNewPwd] = useState('');
  const [resetStatus, setResetStatus] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setStatus('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (res.ok) {
      setStatus('✅ Logged in! Redirecting...');
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } else {
      setStatus(`❌ ${data.error}`);
    }

    setLoading(false);
  };

  // Forgot password handlers:
  const handleRequestOtp = async () => {
    setResetStatus('');
    setResetLoading(true);
    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ email: resetEmail, mode: "reset" }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    if (res.ok) {
      setResetStatus("✅ OTP sent!");
      setResetStep("verify");
    } else {
      setResetStatus("❌ " + data.error);
    }
    setResetLoading(false);
  };

  const handleVerifyOtp = async () => {
    setResetStatus('');
    setResetLoading(true);
    const res = await fetch('/api/auth/reset-password/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email: resetEmail, otp: resetOtp }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    if (res.ok) {
      setResetStatus("✅ OTP verified, set new password.");
      setResetStep("set");
    } else {
      setResetStatus("❌ " + data.error);
    }
    setResetLoading(false);
  };

  const handleSetNewPwd = async () => {
    setResetStatus('');
    setResetLoading(true);
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email: resetEmail, newPassword: resetNewPwd }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    if (res.ok) {
      setResetStatus("✅ Password updated. You can login now.");
      setTimeout(() => {
        setForgotOpen(false);
        setResetStep("enter");
        setResetEmail('');
        setResetOtp('');
        setResetNewPwd('');
        setResetStatus('');
      }, 1500);
    } else {
      setResetStatus("❌ " + data.error);
    }
    setResetLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#faf7ed] via-[#E0D5FA] to-[#ffe9fa]">
      <motion.div
        className="w-full max-w-md bg-white/90 border border-[#6C4AB6]/10 rounded-3xl shadow-2xl p-8 md:p-10 flex flex-col items-center"
        initial={{ y: 26, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55 }}
      >
        {/* Logo/avatar */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block rounded-full shadow-lg border-4 border-white">
            <Image
              src="/logo3.jpeg"
              alt="Site Logo"
              width={100}
              height={100}
              className="rounded-full"
            />
          </span>
        </motion.div>

        <h2 className="text-2xl font-extrabold text-[#5B3DF6] mb-2 tracking-wide text-center flex gap-2 items-center">
          <LockKeyhole size={20} />
          Login to Your Account
        </h2>

        <div className="w-full mb-3">
          <div className="relative">
            <input
              type="email"
              placeholder="Your student email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="username"
              className="w-full px-5 py-4 rounded-full bg-[#faf7ed] border-2 border-[#E0D5FA] text-[#23185B] focus:ring-2 focus:ring-[#5B3DF6] focus:outline-none text-base shadow placeholder-[#a78bfa] font-semibold transition pr-10"
            />
            <MailCheck size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8e79df]" />
          </div>
        </div>
        <div className="w-full mb-3">
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full px-5 py-4 rounded-full bg-[#faf7ed] border-2 border-[#E0D5FA] text-[#23185B] focus:ring-2 focus:ring-pink-400 focus:outline-none text-base shadow placeholder-[#a78bfa] font-semibold transition pr-10"
            />
            <LockKeyhole size={17} className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400" />
          </div>
        </div>

        <motion.button
          onClick={handleLogin}
          disabled={loading}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-4 mt-1 rounded-full font-bold tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 bg-[#5B3DF6] hover:bg-[#6C4AB6] text-white disabled:opacity-60"
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          {loading ? 'Logging in...' : 'Login'}
        </motion.button>

        <span className="w-full text-right mt-2">
          <button
            className="text-blue-500 underline text-xs font-semibold hover:opacity-80"
            onClick={() => setForgotOpen(true)}
          >
            Forgot password?
          </button>
        </span>

        {/* Modal for forgot password */}
        {forgotOpen && (
          <div className="fixed z-40 left-0 top-0 w-full min-h-screen flex items-center justify-center bg-black/15">
            <div className="bg-white/90 w-[95vw] max-w-sm rounded-2xl shadow-2xl border border-blue-200 p-7 flex flex-col gap-5 relative">
              <button
                className="absolute right-3 top-3 text-gray-500 text-xl font-bold"
                onClick={() => setForgotOpen(false)}
              >×</button>
              <h3 className="text-lg font-extrabold text-[#5B3DF6] mb-2 flex items-center gap-2 justify-center">
                <KeyRound size={19} className="text-emerald-400" />
                Reset Password
              </h3>
              {resetStep === "enter" && (
                <>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={e => setResetEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full px-4 py-3 rounded-full border-2 border-blue-200 text-gray-700 font-semibold bg-[#f7f5fe] focus:outline-none mb-2"
                  />
                  <motion.button
                    className="w-full py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold mt-1 transition"
                    whileHover={{ scale: 1.03 }}
                    disabled={resetLoading}
                    onClick={handleRequestOtp}
                  >
                    {resetLoading ? <Loader2 size={17} className="animate-spin inline" /> : "Send OTP"}
                  </motion.button>
                </>
              )}
              {resetStep === "verify" && (
                <>
                  <input
                    type="text"
                    value={resetOtp}
                    onChange={e => setResetOtp(e.target.value)}
                    placeholder="OTP from email"
                    className="w-full px-4 py-3 rounded-full border-2 border-blue-200 text-gray-700 font-semibold bg-[#f7f5fe] focus:outline-none mb-2"
                  />
                  <button
                    className="w-full py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold mt-1"
                    disabled={resetLoading}
                    onClick={handleVerifyOtp}
                  >
                    {resetLoading ? <Loader2 size={17} className="animate-spin inline" /> : "Verify OTP"}
                  </button>
                </>
              )}
              {resetStep === "set" && (
                <>
                  <input
                    type="password"
                    value={resetNewPwd}
                    onChange={e => setResetNewPwd(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 rounded-full border-2 border-blue-200 text-gray-700 font-semibold bg-[#f7f5fe] focus:outline-none mb-2"
                  />
                  <button
                    className="w-full py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold mt-1"
                    disabled={resetLoading}
                    onClick={handleSetNewPwd}
                  >
                    {resetLoading ? <Loader2 size={17} className="animate-spin inline" /> : "Set Password"}
                  </button>
                </>
              )}
              {resetStatus && (
                <span
                  className={`block text-center font-semibold text-sm ${
                    resetStatus.startsWith("✅")
                      ? "text-emerald-500"
                      : resetStatus.startsWith("❌")
                      ? "text-rose-500"
                      : "text-gray-500"
                  }`}
                >
                  {resetStatus}
                </span>
              )}
            </div>
          </div>
        )}

        {status && (
          <motion.p
            className={`
              mt-5 mb-2 text-center text-base font-semibold transition
              ${
                status.startsWith('✅')
                  ? "text-green-500"
                  : status.startsWith('❌')
                  ? "text-pink-500"
                  : "text-[#a78bfa]"
              }
            `}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {status}
          </motion.p>
        )}

        <p className="mt-6 text-sm text-center text-[#5B3DF6] hover:underline font-medium cursor-pointer"
          onClick={() => router.push('/auth')}
        >
          Don&apos;t have an account? <span className="underline">Sign up</span>
        </p>
      </motion.div>
    </div>
  );
}
