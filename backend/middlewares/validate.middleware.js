import { sendResponse } from "../utils/sendResponse.js";

export function validate(schema) {
  return async (req) => {
    try {
      const body = await req.json();
      const validatedData = schema.parse(body);
      return { success: true, data: validatedData };
    } catch (error) {
      if (error.name === "ZodError") {
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        return {
          success: false,
          response: sendResponse({
            success: false,
            statusCode: 400,
            message: "Validation Error",
            errors: formattedErrors,
          }),
        };
      }
      return {
        success: false,
        response: sendResponse({
          success: false,
          statusCode: 400,
          message: "Invalid JSON payload",
        }),
      };
    }
  };
}
