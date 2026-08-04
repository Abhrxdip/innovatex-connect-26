import { registerUser, loginUser } from "../services/auth.service.js";

export async function registerController(data) {
  return await registerUser(data);
}

export async function loginController(data) {
  return await loginUser(data);
}
