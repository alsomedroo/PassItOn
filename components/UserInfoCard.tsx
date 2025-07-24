"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { motion } from "framer-motion";

type UserInfo = {
  email: string;
  userId?: string;
  fullName?: string;
  username?: string;
};

export function UserInfoCard() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.loggedIn && data.user) {
          setUser(data.user);
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Not logged in</div>;
  }

  return (
    <div>
      <div>{user.fullName || "Full Name not set"}</div>
      <div>{user.username ? "@" + user.username : "Username not set"}</div>
      <div>{user.email || "User"}</div>
      {user.userId && <div>User ID: {user.userId}</div>}
    </div>
  );
}
