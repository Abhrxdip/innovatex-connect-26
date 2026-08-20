import { NextRequest, NextResponse } from "next/server";

export function redirectToCorrectDashboard(role: "Admin" | "Student" | "Community Partner" | "Working Professional" | "Undefined" | string, req: NextRequest): NextResponse {
    switch (role) {
        case "Admin":
            return NextResponse.redirect(new URL("/admin", req.url))
        case "Community Partner":
            return NextResponse.redirect(new URL("/partner", req.url))
        case "Student":
            return NextResponse.redirect(new URL("/dashboard", req.url))
        case "Working Professional":
            return NextResponse.redirect(new URL("/dashboard", req.url))
        case "Undefined":
            return NextResponse.redirect(new URL("/login", req.url))
        default:
            return NextResponse.redirect(new URL("/register", req.url))
    }
}