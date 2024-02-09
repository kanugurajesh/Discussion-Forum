import { connect } from "@/dbConfig/dbConfig";
import Post from "@/models/postModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

// Establish database connection
connect();

export async function POST(request: NextRequest) {
  try {
    // Parse incoming JSON data from the request body
    const { serialNo, name, profile, content, image } = await request.json();

    // Create a new user instance
    const user = new User({
      name,
      profile,
      content,
      image,
    });

    // Save the user to the database
    await user.save();

    // Find the post by serial number
    const post = await Post.findOne({ serialNo });

    if (!post) {
      // If post not found, return a 404 response
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    // Add the user to the post
    post.messages.push(user);

    // Save the updated post
    await post.save();

    // Return success response
    return NextResponse.json({ message: "User created and added to post successfully" }, { status: 201 });
  } catch (error) {
    // Handle any errors that occur during processing
    console.error("Error processing request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
