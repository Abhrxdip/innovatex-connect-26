import { sendResponse } from "../utils/sendResponse.js";

export function authorize(...allowedRoles) {
  return (user) => {
    if (!user || !allowedRoles.includes(user.role)) {
      return {
        authorized: false,
        response: sendResponse({
          success: false,
          statusCode: 403,
          message: "Forbidden: You do not have permission to access this resource",
        }),
      };
    }
    return { authorized: true };
  };
}
