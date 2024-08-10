import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";
import client from "../_components/appwrite-client";

const db = new Databases(client);
const db_id = process.env.APPWRITE_DB_ID as string;
const coll_id = process.env.APPWRITE_COLL_ID as string;

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const response = await db.createDocument(db_id, coll_id, ID.unique(), data);
    return NextResponse.json({ message: `Create ${response.name} success` });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error?.response?.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const response = await db.listDocuments(db_id, coll_id, [Query.orderDesc("$createdAt")]);
    return NextResponse.json(response.documents);
  } catch (error: any) {
    return NextResponse.json({ error: error?.response?.message }, { status: 400 });
  }
}
