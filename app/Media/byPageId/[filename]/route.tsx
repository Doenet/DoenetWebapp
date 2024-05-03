import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
import { createDocument, createUser, findOrCreateUser, getDoc, getDocEditorData, listUserDocs } from "@/app/lib/doenet-data"
import { cookies } from 'next/headers'

// To handle a GET request to /api
export async function GET(request: NextApiRequest, params: {params: {filename: string} }) {
  // Do whatever you want

  // TODO - is is heavy to construct this on each request?
  const prisma = new PrismaClient()

  const jwtSecretKey = process.env.JWT_SECRET

  const doenetId = Number(params.params.filename.replace(".doenet", ""));
  const doc = await getDoc(doenetId);
  return new Response(doc.contentLocation, { status: 200});
}

// To handle a POST request to /api
export async function POST(request) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}
