import {
  verifyToken
} from "../utils/jwt.js";
import {
  sendResponse
} from "../utils/sendResponse.js";
import User from "../models/User.js";

export async function authenticate(req) {
  let token = null;

  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    const cookieHeader = req.headers.get("cookie");
    if (cookieHeader) {
      const cookies = Object.fromEntries(
        cookieHeader.split("; ").map((c) => {
          const [key, ...v] = c.split("=");
          return [key, v.join("=")];
        })
      );
      token = cookies.token;
    }
  }

  if (!token) {
    return {
      authenticated: false,
      response: sendResponse({
        success: false,
        statusCode: 401,
        message: "Unauthorized: Not signed in",
      }),
    };
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return {
      authenticated: false,
      response: sendResponse({
        success: false,
        statusCode: 401,
        message: "Unauthorized: Invalid or expired credentials",
      }),
    };
  }

  const user = await User.findById(decoded.userId).select("-password");
  if (!user) {
    return {
      authenticated: false,
      response: sendResponse({
        success: false,
        statusCode: 401,
        message: "Unauthorized: User not found",
      }),
    };
  }

  return {
    authenticated: true,
    user
  };
}