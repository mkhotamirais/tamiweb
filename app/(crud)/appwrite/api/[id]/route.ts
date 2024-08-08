import client from "@/lib/appwrite-client";
import { Databases } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

async function fetchPost(id: string) {
  try {
    const post = await database.getDocument(process.env.APPWRITE_DB_ID as string, "crud-post", id);
    return post;
  } catch (error) {
    console.error(`Error fetching post`, error);
    throw new Error("Failed to fetch data");
  }
}

async function deletePost(id: string) {
  try {
    const response = await database.deleteDocument(process.env.APPWRITE_DB_ID as string, "crud-post", id);
    return response;
  } catch (error) {
    console.error(`Error deleting post`, error);
    throw new Error("Failed to delete data");
  }
}

async function updatePost(id: string, data: { title: string; description: string }) {
  try {
    const response = await database.updateDocument(process.env.APPWRITE_DB_ID as string, "crud-post", id, data);
    return response;
  } catch (error) {
    console.error(`Error updateng post`, error);
    throw new Error("Failed to update data");
  }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const post = await fetchPost(id);
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const post = await deletePost(id);
    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const data = await req.json();
    const post = await updatePost(id, data);
    return NextResponse.json({ message: "Post updated" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}
