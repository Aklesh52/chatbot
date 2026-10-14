import { unstable_rethrow } from "next/navigation";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { signIn } from "@/app/(auth)/auth";

export async function GET(request: Request) {
  const { searchParams, protocol } = new URL(request.url);
  const rawRedirect = searchParams.get("redirectUrl") || "/";
  const redirectUrl =
    rawRedirect.startsWith("/") && !rawRedirect.startsWith("//")
      ? rawRedirect
      : "/";

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: protocol === "https:",
  });

  if (token) {
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    return NextResponse.redirect(new URL(`${base}/`, request.url));
  }

  try {
    return await signIn("guest", { redirect: true, redirectTo: redirectUrl });
  } catch (error) {
    unstable_rethrow(error);
    console.error("Guest sign-in failed", error);
    return new Response(
      "Could not start a guest session because the database is unreachable or not set up.\nCheck that POSTGRES_URL points to a working Postgres database and redeploy.",
      { status: 500, headers: { "content-type": "text/plain; charset=utf-8" } }
    );
  }
}
