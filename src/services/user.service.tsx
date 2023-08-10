import User from "@/models/register.model";
import httpInterceptor from "./../interceptors/httpInterceptor";
import CheckUser from "@/models/checkUser.model";

export async function getAllUsers(): Promise<User[]> {
  const response = await httpInterceptor.get("users");
  return response.data;
}
export async function postUser(body: User): Promise<User> {
  const response = await httpInterceptor.post("users", body);
  return response.data;
}
export async function checkUser(user: User): Promise<CheckUser> {
  const allUsers: User[] = await getAllUsers();
  const userFound: User | undefined = allUsers.find(
    (element: User) => element.email === user.email
  );
  if (userFound) {
    if (userFound.password === user.password) {
      return {
        user: userFound,
        type: "success",
        message: "Successfully logged in",
      };
    } else {
      return {
        user: undefined,
        type: "error",
        message: "Password isn't correct",
      };
    }
  } else {
    return { user: undefined, type: "error", message: "User doesn't exist" };
  }
}
