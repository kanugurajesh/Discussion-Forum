"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

export default function Posts({ params }: { params: { serialNo: number } }) {
  const [post, setPost] = useState({});

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch("/api/getpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serialNo: params.serialNo }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setPost(data);
        // console.log(data);
      } else {
        toast.error("Post not found");
        console.log("Post not found");
      }
    };

    getPost();
  }, [params.serialNo]);

  return (
    <main className="p-4 flex flex-col gap-5">
      <Toaster />
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-2xl font-black">Post</h1>
        <p>Read or Leave a message</p>
      </div>
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="bg-black text-white font-medium text-lg p-1 rounded-sm px-2 hover:bg-white hover:text-black border-black border-2 transition duration-300 ease-in-out outline-none"
        >
          Go Back
        </Link>
        <Link
          href="/setprofile"
          className="bg-black text-white font-medium text-lg p-1 rounded-sm px-2 hover:bg-white hover:text-black border-black border-2 transition duration-300 ease-in-out"
        >
          Set Profile
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center gap-3 mt-6">
        {/* @ts-ignore */}
        <h1 className="text-2xl font-black">{post.title}</h1>
        {/* @ts-ignore */}
        {post.content && <p>{post.content}</p>}
        {/* @ts-ignore */}
        {post.image && (<Image src={post.image} alt="Image" width={200} height={200} />)}
      </div>
    </main>
  );
}
