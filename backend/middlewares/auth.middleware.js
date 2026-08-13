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

  const unAuthorizedResponse = sendResponse({
    success: false,
    statusCode: 401,
    message: "Unauthorized: User not found",
  })

  unAuthorizedResponse.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  if (!token) {
    return {
      authenticated: false,
      response: unAuthorizedResponse,
    };
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return {
      authenticated: false,
      response: unAuthorizedResponse,
    };
  }

  const user = await User.findById(decoded.userId).select("-password");
  if (!user) {
    return {
      authenticated: false,
      response: unAuthorizedResponse,
    };
  }

  return {
    authenticated: true,
    user
  };
}