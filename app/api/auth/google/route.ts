import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto"
import { cookies } from "next/headers";
import { isProd, redirectHost } from "../../constants";

export async function GET(request: NextRequest) {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth"
    //? Just csrf token
    const secureRandom = crypto.randomUUID()
    try {
        const cookieStore = await cookies()

        const options: GoogleAuthOption = {
            redirect_uri: `${redirectHost}/api/auth/callback/google`,
            client_id: process.env.GOOGLE_AUTH_CLIENT_ID!,
            access_type: "offline",
            prompt: "consent",
            response_type: "code",
            scope: [
                "openid",
                "profile",
                "email",

            ].join(" "),
            state: secureRandom
        };

        cookieStore.set("oauth_state", secureRandom, {
            httpOnly: true,
            secure: isProd,
            maxAge: 60 * 10,
            path: "/",
            sameSite: "lax",
        })

        const referralCode = request.nextUrl.searchParams.get("ref")

        if (referralCode) {
            cookieStore.set("ref", referralCode, { path: "/", sameSite: "lax", maxAge: 60 * 10, httpOnly: true, secure: isProd })
        }

        const qs = new URLSearchParams(options)
        return NextResponse.redirect(`${rootUrl}?${qs.toString()}`)
    } catch (e) {
        //TODO: Error page
        NextResponse.redirect(``)
    }
}


type GoogleAuthOption = { redirect_uri: string, client_id: string, access_type: 'offline', response_type: "code", prompt: "consent", scope: string, state: string }