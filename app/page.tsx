"use client";

import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-4 flex flex-col gap-5">
      <Toaster />
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-2xl font-black">Discussion</h1>
        <p>Discuss with the community</p>
      </div>
      <div className="flex justify-between items-center">
        <Link
          href="/profile"
          className="bg-black text-white font-medium text-lg p-1 rounded-sm px-2 hover:bg-white hover:text-black border-black border-2 transition duration-300 ease-in-out"
        >
          Set Profile
        </Link>
        <Link
          href="/createpost"
          className="bg-black text-white font-medium text-lg p-1 rounded-sm px-2 hover:bg-white hover:text-black border-black border-2 transition duration-300 ease-in-out"
        >
          Create Post
        </Link>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="flex justify-center font-bold text-lg">Posts</h2>
        <div className="max-h-[65vh] overflow-y-scroll">
          <table className="w-full">
            <thead>
              <tr>
                <th className="border border-black w-3 p-2">S.No</th>
                <th className="border border-black p-2">Title</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-2">1</td>
                <td className="border border-black p-2">Post 1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
