"use client";

import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("/api/getposts");

      if (response.status === 200) {
        const data = await response.json();
        setPosts(data);
      } else {
        toast.error("Posts not found");
      }
    };

    getPosts();
  }, []);

  return (
    <main className="p-4 flex flex-col gap-5">
      <Toaster />
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-2xl font-black">Discussion</h1>
        <p>Discuss with the community</p>
      </div>
      <div className="flex justify-between items-center">
        <Link
          href="/setprofile"
          className="bg-black text-white font-medium text-lg p-1 rounded-md px-2 hover:bg-white hover:text-black border-black border-2 transition duration-300 ease-in-out"
        >
          Set Profile
        </Link>
        <Link
          href="/createpost"
          className="bg-black text-white font-medium text-lg p-1 rounded-md px-2 hover:bg-white hover:text-black border-black border-2 transition duration-300 ease-in-out"
        >
          Create Post
        </Link>
      </div>
      <div className="flex flex-col gap-5 mt-8">
        <div className="max-h-[65vh] overflow-y-scroll">
          <table className="w-full border-2 border-black">
            <thead className="border-2 border-black">
              <tr>
                <th className="border border-black w-3 p-2">S.No</th>
                <th className="border border-black p-2">Post</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={index}>
                  <td className="border border-black w-3 p-2 font-bold">
                    {index + 1}
                  </td>
                  <td className="border border-black p-2 cursor-pointer font-bold text-blue-400 hover:underline">
                    {/* @ts-ignore */}
                    <Link href={`/post/${post.serialNo}`}>
                      {/* @ts-ignore */}
                      {post.title}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
