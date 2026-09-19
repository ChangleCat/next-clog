import { NextResponse, type NextRequest } from "next/server";

/**
 * Next.js decodes route params twice — once while normalising the incoming
 * pathname, again inside its route matcher — and the matcher throws
 * `DecodeError: failed to decode param` when the second decode fails. On a
 * route that has `generateStaticParams` this surfaces as an unhandled 500:
 * `/tags/%25/page/1`, `/tags/%zz/page/1` and `/posts/%25` all return 500 today
 * (reproducible on a route containing no application code).
 *
 * Those URLs are malformed, so answer 400 here, before routing. A path is fine
 * when it is unchanged by decoding twice, which is exactly the set the matcher
 * can handle.
 */
const isDecodable = (pathname: string) => {
  try {
    decodeURIComponent(decodeURIComponent(pathname));
    return true;
  } catch {
    return false;
  }
};

export function middleware(request: NextRequest) {
  if (!isDecodable(request.nextUrl.pathname)) {
    return new NextResponse("Bad Request", {
      status: 400,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }
  return NextResponse.next();
}

export const config = {
  // Skip only Next's own asset tree: page routes can contain dots (`/tags/Next.js/...`),
  // so excluding by file extension would leave those URLs unguarded.
  matcher: ["/((?!_next/|favicon.ico).*)"],
};
