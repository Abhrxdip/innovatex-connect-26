import { NextRequest, NextResponse } from "next/server";
import RedisInstance from "../config/redis_connection";
import { sendResponse } from "./sendResponse";

export function asyncCacheHandler(handler: (req: NextRequest, context: unknown) => Promise<NextResponse>): (req: NextRequest, context: unknown) => Promise<NextResponse> {
    return async (req: NextRequest, context: unknown) => {
        try {
            await RedisInstance()
            return await handler(req, context)
        } catch (error) {
            const statusCode = (error as unknown & { statusCode: number }).statusCode || (error as unknown & { status: number }).status || 500;
            const message = (error as unknown & { message: string }).message || "Internal Server Error";
            console.error("Unable to connect to redis cache" + String(error))
            return sendResponse({
                success: false,
                message: message,
                statusCode: statusCode,
                errors: process.env.NODE_ENV === "development" ? (error as { stack: unknown }).stack : null,
            })
        }
    }
}