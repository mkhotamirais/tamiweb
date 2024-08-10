import { Databases } from "appwrite";
import { NextResponse } from "next/server";
import client from "../../_components/appwrite-client";

const db = new Databases(client);
const db_id = process.env.APPWRITE_DB_ID as string;
const coll_id = process.env.APPWRITE_COLL_ID as string;

export async function GET(req: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const response = await db.getDocument(db_id, coll_id, id);
    return NextResponse.json({ response });
  } catch (error: any) {
    return NextResponse.json({ error: error?.response?.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const response = await db.deleteDocument(db_id, coll_id, id);
    console.log(response);
    return NextResponse.json({ message: "Post deleted" });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error?.response?.message }, { status: 400 });
  }
}

export async function PATCH(req: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const response = await db.updateDocument(db_id, coll_id, id, data);
    return NextResponse.json({ message: "Post updated" });
  } catch (error: any) {
    return NextResponse.json({ error: error?.response?.message }, { status: 400 });
  }
}
