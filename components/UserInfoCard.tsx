"use client";

import { useState, useEffect } from "react";
import { Pencil, UserRound } from "lucide-react";

interface User {
  fullName: string;
  username: string;
  email: string;
}

export default function UserInfoCard() {
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ fullName: "", username: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
          setForm({
            fullName: data.user.fullName || '',
            username: data.user.username || '',
          });
        }
      });
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    setError("");
    const res = await fetch("/api/user/update-profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Something went wrong");
    } else {
      setUser(data.user);
      setEditing(false);
    }
  };

  if (!user) return <div className="text-black">Loading...</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-md mx-auto mt-10 text-black">
       <div className="w-16 h-16 bg-[#5B3DF6]/10 rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
        <UserRound className="text-[#5B3DF6]" size={32} />
      </div>
      <div className="h-4"></div>

      <div className="space-y-4">
        {/* Full Name */}
        <div className="flex justify-between items-center">
          <label className="font-medium">Full Name:</label>
          {editing ? (
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="border p-1 rounded w-1/2 text-black"
            />
          ) : (
            <span className="text-black">{user.fullName}</span>
          )}
        </div>

        {/* Username */}
        <div className="flex justify-between items-center">
          <label className="font-medium">Username:</label>
          {editing ? (
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="border p-1 rounded w-1/2 text-black"
            />
          ) : (
            <span className="text-black">@{user.username}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex justify-between items-center">
          <label className="font-medium">Email:</label>
          <span className="text-black">{user.email}</span>
        </div>

        {/* Error */}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        {/* Buttons */}
        <div className="flex justify-end mt-4">
          {editing ? (
            <>
              <button
                onClick={() => setEditing(false)}
                className="text-sm mr-2 border px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </>
          ) : (
            <button onClick={handleEdit} title="Edit">
              <Pencil className="w-5 h-5 text-gray-600 hover:text-black" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
