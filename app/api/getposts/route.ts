import { connect } from "@/dbConfig/dbConfig";
import Post from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  const { serialNo } = await request.json();

  // get the post with the title
  const post = await Post.findOne({ serialNo });

  // if the post exists, return it
  if (post) {
    return NextResponse.json(post, { status: 200 });
  }

  // if the post does not exist, return an error
  return NextResponse.json({ message: "Post not found" }, { status: 404 });
}

export async function GET() {
  // get all the posts from the database

  const posts = await Post.find({});

  // if the posts exist, return them
  if (posts) {
    return NextResponse.json(posts, { status: 200 });
  }

  // if the post does not exist, return an error
  return NextResponse.json({ message: "Post not found" }, { status: 404 });
}
