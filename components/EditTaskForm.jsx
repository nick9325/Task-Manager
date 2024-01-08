"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTaskForm({ id, title, description }) {
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ newTitle, newDescription }),
            });

            if (!res.ok) {
                throw new Error("Failed to update task");
            }

            router.refresh();
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-black">
            <input
                onChange={(e) => setNewTitle(e.target.value)}
                value={newTitle}
                className="border border-slate-500  rounded-lg text-sm px-5 py-2.5 mr-2 px-8 py-2"
                type="text"
                placeholder="task Title"
            />

            <input
                onChange={(e) => setNewDescription(e.target.value)}
                value={newDescription}
                className="border border-slate-500 rounded-lg text-sm px-5 py-2.5 mr-2 px-8 py-2"
                type="text"
                placeholder="task Description"
            />

            <div className="flex justify-center">
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update Task</button>
            </div>
        </form>
    );
}