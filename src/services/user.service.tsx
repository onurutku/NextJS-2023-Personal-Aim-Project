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
export async function checkUser(user: User): Promise<User | undefined> {
  const allUsers: User[] = await getAllUsers();
  const matched: User | undefined = allUsers.find(
    (element: User) =>
      element.email === user.email && element.password === user.password
  );
  return matched;
}
