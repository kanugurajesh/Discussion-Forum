"use client";

import { useEffect, useState } from "react";

export default function Posts({ params }: { params: { name: string } }) {
  useEffect(() => {
    const getPost = async () => {
      const response = await fetch("/api/getpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: params.name }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
      } else {
        console.log("Post not found");
      }
    };

    getPost();
  }, [params.name]);

  return (
    <main className="p-4 flex flex-col gap-5">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-2xl font-black">Post</h1>
        
        <p>Add post in the forum</p>
      </div>
    </main>
  );
}
