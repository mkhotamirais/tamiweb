import client from "@/lib/appwrite-client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

// create post
async function createPost(data: { title: string; description: string }) {
  try {
    const response = await database.createDocument(
      process.env.APPWRITE_DB_ID as string,
      "crud-post",
      ID.unique(),
      data
    );
    return response;
  } catch (error) {
    console.error("Error creating crud-post", error);
    throw new Error("Failed to create crud-post");
  }
}

// fetch post
async function fetchPost() {
  try {
    const response = await database.listDocuments(process.env.APPWRITE_DB_ID as string, "crud-post", [
      Query.orderDesc("$createdAt"),
    ]);
    return response.documents;
  } catch (error) {
    console.error("Error fetching crud-post", error);
    throw new Error("Failed to fetch crud-post");
  }
}

export async function POST(req: Request) {
  try {
    const { title, description } = await req.json();
    const data = { title, description };
    const response = await createPost(data);
    return NextResponse.json({ message: "Post created" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const post = await fetchPost();
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}
