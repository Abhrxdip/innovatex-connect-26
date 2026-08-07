import {
  NextResponse
} from "next/server";

/**
 * @param {{
 *   success?: boolean;
 *   statusCode?: number;
 *   message?: string;
 *   data?: unknown;
 *   errors?: unknown;
 * }} params
 * @returns NextResponse
 */

export function sendResponse({
  success = true,
  statusCode = 200,
  message = "",
  data = null,
  errors = null
}) {
  return NextResponse.json({
    success,
    message,
    ...(data !== null && {
      data
    }),
    ...(errors !== null && {
      errors
    }),
  }, {
    status: statusCode
  });
}