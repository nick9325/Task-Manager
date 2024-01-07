
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import { cookies } from 'next/headers'




const getTasks = async () => {
    const cookieStore = cookies()
    const userId = cookieStore.get('id').value;

    try {
        const res = await fetch(`https://task-manager-zeta-roan.vercel.app/api/tasks?userId=${userId}`, {
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error("Failed to fetch tasks");
        }
        return res.json();
    } catch (error) {
        console.log("Error loading tasks: ", error);
    }
}

export default async function Tasklist() {
    const { tasks } = await getTasks();

    return (
        <>
            {tasks.map((t) => (


                <div key={t.id} className="p-4 border border-slate-300 rounded my-3 flex justify-between gap-5 items-start">
                    <div>
                        <h2 className="font-bold text-2xl">{t.title}</h2>
                        <div>{t.description}</div>
                    </div>

                    <div className="flex gap-2">
                        <RemoveBtn id={t._id} />
                        <Link href={`/editTask/${t._id}`}>
                            <HiPencilAlt size={24} />
                        </Link>
                    </div>

                </div>

            ))}

        </>
    );
}