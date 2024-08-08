import React from "react";

export default async function PostId({ params }: { params: { id: string } }) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(`https://dummyjson.com/posts/${params.id}`);
  const data = await response.json();

  return (
    <div className="flex-grow flex flex-col items-center justify-center px-3 max-w-lg text-center mx-auto">
      <h1 className="text-3xl my-3">{data.title}</h1>
      <p>{data.body}</p>
    </div>
  );
}
