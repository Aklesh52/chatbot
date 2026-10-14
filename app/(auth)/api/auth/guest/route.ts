import { unstable_rethrow } from "next/navigation";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { signIn } from "@/app/(auth)/auth";
import { databaseUrl } from "@/lib/db/url";

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

  if (!databaseUrl()) {
    return new Response(
      "Server is missing the POSTGRES_URL (or DATABASE_URL) environment variable.\nAdd it in your hosting settings (for Vercel: Settings > Environment Variables, for this environment) and redeploy.",
      { status: 500, headers: { "content-type": "text/plain; charset=utf-8" } }
    );
  }

  try {
    return await signIn("guest", { redirect: true, redirectTo: redirectUrl });
  } catch (error) {
    unstable_rethrow(error);
    console.error("Guest sign-in failed", error);
    return new Response(
      "POSTGRES_URL is set, but the app could not use the database (unreachable, wrong address or password, or tables not created).\nCheck the database is running and the address is correct, then redeploy.",
      { status: 500, headers: { "content-type": "text/plain; charset=utf-8" } }
    );
  }
}
