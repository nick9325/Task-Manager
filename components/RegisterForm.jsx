"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function RegisterForm() {

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit=async(e)=>{
        e.preventDefault();

        if(!username || !email || !password ){
            setError("All fieds are necessary")
            return;
        }
        try {

            const resUserExists = await fetch(`/api/userExists`,{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({email}),
            });

            const {user} = await resUserExists.json();

            if(user){
                setError("user already exists")
                return;
            }

            const res=await fetch("/api/register",{
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    username,email,password,
                }),
            });
    
            if(res.ok){
                const form = e.target;
                form.reset();
                router.push("/login");

            }
            else{
                console.log("User registration failed");
            }
            
        } catch (error) {
            console.log("Error during registration ", error);
        }

        
    }

    

    return (
        <div className="flex justify-center">
            <div className="w-[400px] bg-black p-6 rounded shadow shadow-slate-300">
                <h1 className="text-white-700 text-2xl font-medium flex justify-center">Register</h1>
                <form onSubmit={handleSubmit} className="mt-6 mb-4">
                    <div className="flex flex-col space-y-3">
                        <label htmlFor="username">
                            <p className="font-medium text-white-700 pb-2">Username</p>
                            <input onChange={(e)=>setUserName(e.target.value)} id="username" name="username" type="text" className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-black" placeholder="Enter username" />
                        </label>
                        <label htmlFor="email">
                            <p className="font-medium text-white-700 pb-2">Email</p>
                            <input onChange={(e)=>setEmail(e.target.value)} id="email" name="email" type="email" className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-black" placeholder="Enter email address" />
                        </label>
                        <label htmlFor="password">
                            <p className="font-medium text-white-700 pb-2">Password</p>
                            <input onChange={(e)=>setPassword(e.target.value)} id="password" name="password" type="password" className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-black" placeholder="Enter your password" />
                        </label>
                        <div className="pb-2"></div>
                
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            <span>Register</span>
                        </button>


                        {error && (
                            <div className="text-red-500 text-center text-sm rounded-md">{error}</div>
                        )
                        }

                        <p className="text-center text-sm pt-4 text-white-700">Already have an account? <Link href={"/login"} className="text-indigo-600 font-medium inline-flex space-x-1 items-center"><span className="underline">Login here </span></Link></p>
                    </div>


                </form>
            </div>
        </div>
    )
}
