import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
import { createDocument, createUser, findOrCreateUser, listUserDocs } from "@/app/lib/doenet-data"
import { cookies } from 'next/headers'

// To handle a GET request to /api
export async function GET(request: NextApiRequest, params: {params: {uri: string} }) {
  // Do whatever you want

  // TODO - is is heavy to construct this on each request?
  const prisma = new PrismaClient()

  const jwtSecretKey = process.env.JWT_SECRET
  console.log(jwtSecretKey);


  const loggedInEmail = cookies().get('email')?.value;
  const loggedInUserId = Number(cookies().get('userId')?.value);

  const apisRequiringLogin = [
    "createPortfolioActivity.php",
    "loadProfile.php"
  ]

  console.log(loggedInUserId);
  console.log(loggedInEmail);

  if (!loggedInUserId && apisRequiringLogin.find( (url) => url === params.params.uri)) {
    return NextResponse.json({ message : "need to be logged in to do that"}, { status: 401 });
  }
  //console.log(params);
  //console.log(params.params.uri);
  switch (params.params.uri) {
    case "getQuickCheckSignedIn.php":
      const signedIn = cookies().get("email") ? true : false;
      return NextResponse.json({ signedIn: signedIn }, { status: 200 });
      break;
    // TODO change this, it puts PII, i.e. emails in the URL, which is best to avoid
    // URLs get logged to server logs, which we should try to keep PII out of
    case "sendSignInEmail.php":
      // TODO - look into why typescript doesn't like nextUrl, because it works anyway 
      const email = request.nextUrl.searchParams.get("emailaddress");
      //createUser(email);
      const userId = await findOrCreateUser(email);
      cookies().set('email', email);
      cookies().set('userId', String(userId));
      return NextResponse.json({ success: true}, { status: 200 });
      break;
    case "createPortfolioActivity.php":
      const docId = await createDocument(loggedInUserId);
      return NextResponse.json({ success: true,
        docId
      }, { status: 200 });
      break;
    case "checkCredentials.php":
      const loggedIn = cookies().get('email') ? true : false;
      return NextResponse.json({ success: loggedIn }, { status: 200 });
    case "getCoursePermissionsAndSettings.php":
      return NextResponse.json({ }, { status: 400 });
    case "loadPromotedContent.php":
      return NextResponse.json({ message: params.params.uri }, { status: 200 });
      break;
    case "getPortfolio.php":
      return NextResponse.json({ 
        'success': true,
        'publicActivities': await listUserDocs(loggedInUserId),
        'privateActivities': [],
        'fullName' : "stand-in name",
        'notMe' : false
      }, { status: 200 });
      break;
    case "loadProfile.php":
      return NextResponse.json({ 
        'profile' : {
          'screenName' :'',
          'email' : loggedInEmail,
          'firstName' :'',
          'lastName' :'',
          'profilePicture' : 'anonymous',
          'trackingConsent' : true,
          'signedIn' : '0',
          'userId' : '',
          'canUpload' : '0'
      }}, { status: 200 });
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