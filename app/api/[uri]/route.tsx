import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(request: NextApiRequest, params: {params: {uri: string} }) {
  // Do whatever you want

  console.log(params);
  console.log(params.params.uri);
  switch (params.params.uri) {
    case "loadPromotedContent.php":
      return NextResponse.json({ message: params.params.uri }, { status: 200 });
      break;
    case "hello":
      return NextResponse.json({ message: "Hello World" }, { status: 200 });
    default:
      return NextResponse.json({ message: "Not valid API" }, { status: 200 });
  }
}

// To handle a POST request to /api
export async function POST(request) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}