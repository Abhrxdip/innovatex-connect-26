import { NextResponse } from "next/server";

export function sendResponse({ success = true, statusCode = 200, message = "", data = null, errors = null }) {
  return NextResponse.json(
    {
      success,
      message,
      ...(data !== null && { data }),
      ...(errors !== null && { errors }),
    },
    { status: statusCode }
  );
}
