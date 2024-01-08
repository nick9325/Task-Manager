"use client";
import { signOut } from "next-auth/react";
import Link from "next/link"
import { useSession } from "next-auth/react";

export default function Header() {


  const { data: session } = useSession();

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center bg-gray-700 rounded px-4 sm:px-8 py-3">
      <Link href="/" className="text-white font-bold mb-2 sm:mb-0 sm:mr-4">
        Task Manager
      </Link>
      <div className="flex items-center flex-col sm:flex-row sm:space-x-4">
        <span className="text-white mb-2 sm:mb-0">
          Welcome, {session?.user?.username} !
        </span>

        <div className="flex space-x-4 sm:space-x-4 mb-2 sm:mb-0">
          <Link
            href="/addTask"
            className="bg-white text-gray-800 py-2 px-4 rounded font-semibold hover:bg-gray-100 focus:outline-none focus:ring focus:ring-white-300"
          >
            Add Task
          </Link>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white py-2 px-4 rounded font-semibold hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>

  )
}
