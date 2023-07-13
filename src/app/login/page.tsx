"use client";
import { useState, useContext } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import User from "@/models/register.model";
import { GlobalContext } from "@/contexts";
import { getAllUsers } from "@/services/user.service";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { user, setUser } = useContext(GlobalContext);
  const router = useRouter();

  const checkUser = async (user: User) => {
    const allUsers: User[] = await getAllUsers();
    const matched: User | undefined = allUsers.find(
      (element: User) =>
        element.email === user.email && element.password === user.password
    );
    if (matched) {
      setUserToMemory(matched);
    }
    return matched;
  };
  const setUserToMemory = (matched: User | undefined) => {
    document.cookie = `auth=${JSON.stringify(matched)}`;
    sessionStorage.setItem("user", JSON.stringify(matched));
    setUser(matched);
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const user: User = {
      email: email,
      password: password,
    };
    (await checkUser(user)) ? router.replace("/") : router.refresh();
  };
  const emailChange = (e: any) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const passwordChange = (e: any) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <>
      {/* imported style page usage*/}
      <div className={styles.main}>
        <h1 className="fw-bold mb-5">Login</h1>
        <div className="p-5 rounded shadow" style={{ width: "35rem" }}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                type="string"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={emailChange}
                value={email}
              />
              <div className="text-danger ms-1 mt-1">
                {/* {errors.email?.message} */}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={passwordChange}
                value={password}
              />
              <div className="text-danger ms-1 mt-1">
                {/* {errors.password
                  ? "Password should contains at least an uppercase,an lowercase and eight characters"
                  : ""} */}
              </div>
            </div>
            <button type="submit" className="btn btn-sm btn-primary float-end">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
