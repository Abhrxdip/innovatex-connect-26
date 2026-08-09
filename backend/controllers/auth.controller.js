import { registerUser, loginUser, updatePassword as forgetPassword } from "../services/auth.service.js";

export async function registerController(data) {
  return await registerUser(data);
}

export async function loginController(data) {
  return await loginUser(data);
}

export async function forgetPasswordController({email, otp, password}){
  return await forgetPassword({email, otp, password})
}