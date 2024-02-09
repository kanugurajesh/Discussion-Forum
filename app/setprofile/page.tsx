"use client";

import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { UploadButton } from "@uploadthing/react";
import { useEffect, useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    setTitle(localStorage.getItem("name") || "");
    setImage(localStorage.getItem("image") || "");
  }, []);

  const handleSubmit = () => {
    if (!title) {
      toast.error("Title is required");
      return;
    }

    localStorage.setItem("title", title);
    localStorage.setItem("image", image);

    toast.success("Profile set successfully");
  };

  return (
    <main className="p-4 flex flex-col gap-5">
      <Toaster />
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-2xl font-black">User Profile</h1>
        <p>Set your user profile here</p>
      </div>
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="bg-black text-white font-medium text-lg p-1 rounded-sm px-2 hover:bg-white hover:text-black border-black border-2 transition duration-300 ease-in-out"
        >
          Go Back
        </Link>
        <Link
          href="/createpost"
          className="bg-black text-white font-medium text-lg p-1 rounded-sm px-2 hover:bg-white hover:text-black border-black border-2 transition duration-300 ease-in-out"
        >
          Create Post
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center gap-3 mt-10">
        {title && <h1 className="text-xl font-bold">{title}</h1>}
        {image && (
          <Image
            src={image}
            alt="Image"
            width={200}
            height={200}
            className="mb-5"
          />
        )}
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
        <input
          type="text"
          placeholder="Enter your name"
          className="border-2 border-black p-2 w-[250px]"
          onChange={handleTitleChange}
        />
        <button
          className="bg-black text-white p-2 font-bold rounded-md w-[250px] outline-none border-2 border-black hover:bg-white hover:text-black transition-all ease-in-out duration-300"
          onClick={handleSubmit}
        >
          Set Profile
        </button>
      </div>
    </main>
  );
}
