"use client";
import { signOut } from "next-auth/react";
import Link from "next/link"
import { useSession } from "next-auth/react";

export default function Header() {
  const {data: session} = useSession();
  console.log(session);
  return (
    <nav className="flex justify-between items-center bg-gray-700 rounded px-8 py-3">
    <Link href="/" className="text-white font-bold">
      Task Manager
    </Link>
    <div className="flex items-center space-x-4">
      <span className="text-white">Welcome, {session?.user?.email}!</span>

      <Link href="/addTask" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          Add Task
      </Link>
      <button
        onClick={()=>signOut()}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
      >
        Logout
      </button>
    </div>
  </nav>
  )
}
