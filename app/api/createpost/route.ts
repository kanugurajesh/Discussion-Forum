import { connect } from "@/dbConfig/dbConfig";
import Post from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  const { title, content, image } = await request.json();

  const count = await Post.countDocuments();

  const post = new Post({
    serialNo: count + 1,
    title,
    content,
    image,
  });

  if (!title) {
    return NextResponse.json({ message: "Title is required" }, { status: 400 });
  }

  await post.save();

  return NextResponse.json(
    { message: "user created successfully" },
    { status: 201 }
  );
}
