import Link from "next/link"
export default function Header() {
  return (
    <nav className="flex justify-between items-center bg-gray-700 rounded px-8 py-3">
       <Link className="text-white font-bold" href={"/"}>Task Manager</Link>
       <Link className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" href={"/addTask"}>Add Task</Link>
    </nav>
  )
}
