import { connect } from "@/dbConfig/dbConfig";
import Post from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  const { title } = await request.json();

  // get the post with the title
  const post = await Post.findOne({ title });

  // if the post exists, return it
  if (post) {
    return NextResponse.json(post, { status: 200 });
  }

  // if the post does not exist, return an error
  return NextResponse.json({ message: "Post not found" }, { status: 404 });
}
