import { NextRequest, NextResponse } from "next/server";
import RedisInstance from "../config/redis_connection";
import { sendResponse } from "./sendResponse";
import redis from "redis"

export function asyncCacheHandler(handler: (req: NextRequest, context: unknown) => Promise<NextResponse>): (req: NextRequest, context: unknown) => Promise<NextResponse> {
    return async (req: NextRequest, context: unknown) => {
        try {
            await RedisInstance()
            return await handler(req, context)
        } catch (error) {

            if (error instanceof redis.ErrorReply) {
                console.error("Redis Connection Error:" + String(error))
                return sendResponse({
                    success: false,
                    message: "Something went wrong, please try again",
                    statusCode: 500,
                    errors: null,
                })
            }
            if (error instanceof redis.TimeoutError) {
                console.error("Redis Timeout Error: " + String(error))
                return sendResponse({
                    success: false,
                    message: "Something went wrong, please try again",
                    statusCode: 500,
                    errors: null,
                })
            }
            const statusCode = (error as unknown & { statusCode: number }).statusCode || (error as unknown & { status: number }).status || 500;
            const message = (error as unknown & { message: string }).message || "Internal Server Error";
            return sendResponse({
                success: false,
                message: message,
                statusCode: statusCode,
                errors: process.env.NODE_ENV === "development" ? (error as { stack: unknown }).stack : null,
            })
        }
    }
}