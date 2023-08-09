"use client"

import Image from "next/image"
import Link from "next/link"
import {useState}  from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"



export default function LoginForm() {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");

    const router=useRouter();



    const handleSubmit=async(e)=>{
        e.preventDefault();

        // if(!email || !password){
        //     setError("All fields are required");
        //     return;
        // }

        try{
            const res = await signIn('credentials',{
                email,
                password,
                redirect: false,
            })

            if(res.error){
                setError("Invalid Credentials");
                return;
            }

            router.replace("/");
        }
        catch(error){}




    }


    return (
        <div className="flex justify-center">
            <div className="w-[400px] bg-black p-6 rounded shadow shadow-slate-300">
                <h1 className="text-2xl font-medium flex justify-center">Login</h1>

                <form onSubmit={handleSubmit} className="mt-6 mb-4">
                    <div className="flex flex-col space-y-3">
                        <label for="email">
                            <p className="font-medium text-white-700 pb-2">Email</p>
                            <input onChange={(e)=>setEmail(e.target.value)}  id="email" name="email" type="email" className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-black" placeholder="Enter email address" />
                        </label>
                        <label for="password">
                            <p className="font-medium text-white-700 pb-2">Password</p>
                            <input onChange={(e)=>setPassword(e.target.value)} id="password" name="password" type="password" className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow text-black" placeholder="Enter your password" />
                        </label>
                        <div className="flex flex-row justify-between">
                            <div>
                                <label for="remember" className="">
                                    <input type="checkbox" id="remember" className="w-4 h-4 border-slate-200 focus:bg-indigo-600" />
                                    Remember me
                                </label>
                            </div>
                            <div>
                                <a href="#" className="font-medium text-indigo-600">Forgot Password?</a>
                            </div>
                        </div>
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            <span>Login</span>
                        </button>

                        {error && <div className="text-red-500 text-center text-sm rounded-md">{error}</div>}


                        <p className="text-center text-sm">Not registered yet? <Link href={"/register"} className="text-indigo-600 font-medium inline-flex space-x-1 items-center"><span className="underline">Register now </span></Link></p>
                    </div>

                    
                </form>

                <p className="flex justify-center">or</p>


                <div className="my-3">
                    <button className="w-full text-center py-2 my-2 border flex space-x-3 items-center justify-center border-slate-200 rounded-lg text-slate-200 hover:border-slate-400 hover:text-blue-700 hover:shadow transition duration-150">
                        <Image width={20} height={20} src="https://www.svgrepo.com/show/355037/google.svg" alt="" /> <span className="text-sm">Login with Google</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
