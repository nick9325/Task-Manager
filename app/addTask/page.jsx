
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function addTask() {



  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert('Title and Description are Required')
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        router.refresh();
        router.push("/");
      }
      else {
        throw new Error("Failed to create a task");
      }

    } catch (error) {
      console.log(error);
    }


  }


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-black">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 px-8 py-2 rounded-lg text-sm px-5 py-2.5 mb-2"
        type="text"
        placeholder="Task Title"
      />

      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-slate-500 px-8 py-2  rounded-lg text-sm px-5 py-2.5 mb-2"
        type="text"
        placeholder="Task Description"
      />

      <div className="flex justify-center">
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Task</button>
      </div>
    </form>
  )
}


