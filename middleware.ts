import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  console.log(req.nextUrl.pathname);

  if (req.nextUrl.pathname.startsWith("/api/entries/")) {
    const id = req.nextUrl.pathname.replace("/api/entries/", "");
    console.log({ id });

    const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

    if (!checkMongoIDRegExp.test(id)) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: `${id} is not a valid MongoID`,
        }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  //   matcher: '/about/:path*',
  matcher: ["/api/entries/:path*"],
};
