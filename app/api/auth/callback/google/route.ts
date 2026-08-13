import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { googleLoginUser } from "@/backend/services/auth.service";
import { email } from "zod/v4";
import { AUTH_PROVIDERS } from "@/backend/config/constants";
import { redirectHost } from "../../../constants";

export async function GET(request: NextRequest) {
    try {
        const params = request.nextUrl.searchParams
        const code = params.get("code")
        const state = params.get("state")
        const error = params.get("error")

        if (error) {
            NextResponse.redirect(new URL("/login?error=access_denied", request.url))
        }

        if (!code || !state) {
            return NextResponse.redirect(new URL('/login?error=invalid_request', request.url));
        }

        const cookieStore = await cookies()
        //? CSRF Protection
        const savedState = cookieStore.get("oauth_state")?.value
        if (!savedState || savedState !== state) {
            return NextResponse.redirect(new URL('/login?error=csrf_validation_failed', request.url));
        }
        const tokenResponse = await fetch(`https://oauth2.googleapis.com/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: process.env.GOOGLE_AUTH_CLIENT_ID!,
                client_secret: process.env.GOOGLE_AUTH_CLIENT_SECRET!,
                code: code,
                grant_type: "authorization_code",
                redirect_uri: `${redirectHost}/api/auth/callback/google`,
            })

        })
        const tokenData = await tokenResponse.json()
        if (tokenData.error) {
            throw new Error(tokenData.error_description)
        }
        const { access_token, id_token } = tokenData

        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })



        const userData = await userResponse.json() as GAuthUserData
        cookieStore.delete('oauth_state')

        const referralCode = cookieStore.get("ref")?.value;
        const { user, token, isNewUser } = await googleLoginUser({ name: userData.name, email: userData.email, referralCode, avatar: userData.picture });

        const redirectUrl = new URL(isNewUser || !user.phone ? '/register' : '/dashboard', request.url);
        if (isNewUser || !user.phone) {
            if (user.name) redirectUrl.searchParams.set('name', user.name);
            if (user.email) redirectUrl.searchParams.set('email', user.email);
            redirectUrl.searchParams.set('provider', AUTH_PROVIDERS.GOOGLE);
        }

        const response = NextResponse.redirect(redirectUrl);
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 2592000,
            path: '/'
        });

        return response;

    } catch (e) {
        console.error('Google OAuth Error:', e)
        return NextResponse.redirect(new URL('/login?error=auth_failed', request.url))
    }
}

type GAuthUserData = { name: string, email: string, picture: string }