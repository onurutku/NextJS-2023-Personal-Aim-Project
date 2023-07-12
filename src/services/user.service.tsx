import User from "@/models/register.model";

export async function getAllUsers(): Promise<User[]> {
  const request = await fetch("http://localhost:3000/users");
  const response: User[] = await request.json();
  return response;
}
export async function postUser(body: User): Promise<User> {
  const request = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const response = await request.json();
  return response;
}
