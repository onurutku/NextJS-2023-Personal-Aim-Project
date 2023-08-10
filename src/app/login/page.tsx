"use client";
import { useState, useContext } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import User from "@/models/register.model";
import { GlobalContext } from "@/contexts";
import { checkUser } from "@/services/user.service";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { user, setUser } = useContext(GlobalContext);
  const router = useRouter();

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
    const isUserExist = await checkUser(user);
    toast(isUserExist.message, {
      hideProgressBar: true,
      autoClose: 2000,
      type: isUserExist.type,
    });
    if (isUserExist.user) {
      setUserToMemory(isUserExist.user);
      router.replace("/");
    } else {
      router.refresh();
    }
  };

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                required={true}
              />
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
                required={true}
              />
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
