
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST( req ){
    try{
        const {username,email,password} = await req.json();
        await connectMongoDB();
        const hashedPassword = await bcrypt.hash(password,10);


        await User.create({username,email,password: hashedPassword});
        return NextResponse.json({message: "User registered"},{status: 201});
    }
    catch(error){
        return NextResponse.json({message: "Error occured while registering the user"},{status: 500});
    }
}