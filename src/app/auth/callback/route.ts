// Import the tools we need
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// This fucntion runs whenever someone visits the /auth/callback URL
export async function GET(request: NextRequest) {
  // Get the current URL and extract the "code" parameter
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  // If there's a code (which there should be from the email link)
  if (code) {
    // Create a Supabase connection that can work with cookies
    const supabase = createRouteHandlerClient({ cookies });

    // Exchange the temporary code for a permanent login session
    await supabase.auth.exchangeCodeForSession(code);
  }
  // Send the user to the dashboard (or wherever you want)
  return NextResponse.redirect(new URL("/home", requestUrl.origin));
}
