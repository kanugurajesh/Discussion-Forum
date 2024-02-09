"use client";

import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { UploadButton } from "@uploadthing/react";
import { useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    if (!title) {
      toast.error("Title is required");
      return;
    }
    if (!content) {
      toast.error("Content is required");
      return;
    }

    const data = {
      title,
      content,
      image,
    };

    const response = await fetch("/api/createpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 201) {
      toast.success("Post created successfully");
      setTitle("");
      setContent("");
      setImage("");
    } else {
      toast.error("Error creating post");
    }
  };

  return (
    <main className="p-4 flex flex-col gap-5">
      <Toaster />
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-2xl font-black">Post</h1>
        <p>Add post in the forum</p>
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
        {image && <Image src={image} alt="Image" width={200} height={200} />}
        <input
          type="text"
          value={title}
          placeholder="Enter the title"
          className="border-2 border-black p-2 w-[250px]"
          onChange={handleTitleChange}
        />
        <textarea
          placeholder="Enter the content"
          value={content}
          cols={24}
          rows={8}
          className="border-2 border-black p-2"
          onChange={handleContentChange}
        />
        {/* @ts-ignore */}
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res: any) => {
            setImage(res[0].url);
            toast.success("Image uploaded successfully");
          }}
          onUploadError={(error: Error) => {
            toast.error(`ERROR! ${error.message}`);
          }}
        />
        <button
          className="bg-black text-white p-2 font-bold rounded-md w-[150px] outline-none border-2 border-black hover:bg-white hover:text-black transition-all ease-in-out duration-300"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </main>
  );
}
