"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { UploadButton } from "@uploadthing/react";
import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

// const customConfig: Config = {
//   dictionaries: [adjectives, colors],
//   separator: '-',
//   length: 2,
// };

import Link from "next/link";
import Image from "next/image";

export default function Posts({ params }: { params: { serialNo: number } }) {

  const randomName: string = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
  });

  const [post, setPost] = useState({});
  const [addMessage, setAddMessage] = useState(false);
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch("/api/getposts", {
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

  useEffect(() => {
    setName(localStorage.getItem("name") || "");
    setProfile(localStorage.getItem("image") || "");

    if (!name) {
      setName(randomName);
      localStorage.setItem("name", randomName);
    }

    if (!profile) {
      const randomProfile: string = `https://source.unsplash.com/random?blue`;
      setProfile(randomProfile);
      localStorage.setItem("image", randomProfile);
    }
  }, []);

  const handleMessage = () => {

  }

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
        <button
          onClick={() => setAddMessage(!addMessage)}
          className="bg-black text-white font-medium text-lg p-1 rounded-sm px-2 hover:bg-white hover:text-black border-black border-2 transition duration-300 ease-in-out"
        >
          Add Message
        </button>
      </div>
      <div className="flex flex-col justify-center items-center gap-3 mt-6">
        {/* @ts-ignore */}
        <h1 className="text-2xl font-black">{post.title}</h1>
        {/* @ts-ignore */}
        {post.content && <p>{post.content}</p>}
        {/* @ts-ignore */}
        {post.image && (<Image src={post.image} alt="Image" width={200} height={200} />)}
      </div>
      <div>
        {addMessage && (
          <div className="flex justify-center items-center gap-3 mt-6">
            <input
              type="text"
              placeholder="Enter your message"
              className="p-2 border-2 border-black rounded-md outline-none mb-6"
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
            <button className="bg-black text-white font-medium text-lg p-1 rounded-sm px-2 hover:bg-white hover:text-black border-black border-2 transition duration-300 ease-in-out mb-6">
              Add
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
