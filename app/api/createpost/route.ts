import { connect } from "@/dbConfig/dbConfig";
import Post from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  const { title, content, image } = await request.json();
  const post = new Post({
    title,
    content,
    image,
  });
  await post.save();

  return NextResponse.json(
    { message: "user created successfully" },
    { status: 201 }
  );
}
