import User from "@/models/register.model";
import httpInterceptor from "./../interceptors/httpInterceptor";

export async function getAllUsers(): Promise<User[]> {
  const response = await httpInterceptor.get("users");
  return response.data;
}
export async function postUser(body: User): Promise<User> {
  const response = await httpInterceptor.post("users", body);
  return response.data;
}
