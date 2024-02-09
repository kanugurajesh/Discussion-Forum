import { connect } from "@/dbConfig/dbConfig";
import Post from "@/models/postModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  // create a list of objects

  const data = [];

  const { serialNo } = await request.json();

  const post = await Post.findOne({ serialNo });

  const id = post.messages;

  for (let i = 0; i < id.length; i++) {
    data.push(await User.findOne({ _id: id[i]._id }));
  }

  return NextResponse.json(data, { status: 200 });
}
