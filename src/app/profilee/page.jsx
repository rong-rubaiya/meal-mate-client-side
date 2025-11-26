"use client"; // must be on top
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>User not logged in</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h1 className="text-xl font-semibold">Welcome, {session.user.name}</h1>
      <p>Email: {session.user.email}</p>
      {session.user.image && <img src={session.user.image} alt="User Image" className="w-16 h-16 rounded-full mt-2" />}
    </div>
  );
}
