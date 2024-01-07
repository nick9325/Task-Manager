import connectMongoDB from "@/libs/mongodb";
import Task from "@/models/task";
import { NextResponse } from "next/server";

export async function POST(request){

    const {title,description,userId} = await request.json();
    await connectMongoDB();
    // const user_id=ObjectId("123");
    await Task.create({title,description,userId});
    return NextResponse.json({message:"Task Created"},{status: 201});
}

export async function GET(request) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "Missing userId" }, { status: 400 });
    }

    await connectMongoDB();
    const tasks = await Task.find({ userId });
    return NextResponse.json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ message: "Error fetching tasks" }, { status: 500 });
  }
}

export async function DELETE(request){
     const id=request.nextUrl.searchParams.get("id");
     await connectMongoDB();
     await Task.findByIdAndDelete(id);
     return NextResponse.json({message: "Task Deleted"},{status: 200});
}

