"use client";
import User from "@/models/register.model";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathName: string = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const logout = () => {
    sessionStorage.removeItem("user");
  };
  //!UseEffect is a changedetection, if you want to check for updates for your variables when an event triggered, then you need to put your variable inside the effect hook
  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")!));
  }, []);
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            Next-OUT
          </Link>
          <form className="d-flex" role="search">
            {user ? (
              <div>
                Welcome, {user?.name}{" "}
                <Link
                  className="btn btn-outline-success"
                  href="/login"
                  onClick={logout}
                >
                  Logout
                </Link>
              </div>
            ) : pathName === "/register" ? (
              <Link className="btn btn-outline-success" href="/login">
                Login
              </Link>
            ) : (
              <Link className="btn btn-outline-success" href="/register">
                Sign Up
              </Link>
            )}
          </form>
        </div>
      </nav>
    </>
  );
}
