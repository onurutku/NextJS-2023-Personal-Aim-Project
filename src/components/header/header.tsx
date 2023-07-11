"use client";
import { GlobalContext } from "@/contexts";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

export default function Header() {
  const { user, setUser } = useContext(GlobalContext);
  const pathName: string = usePathname();
  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
  };
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
