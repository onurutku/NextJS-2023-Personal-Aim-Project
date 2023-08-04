"use client";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext<any>("");

export const GlobalProvider = (props: any) => {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")!));
  }, []);
  return (
    <GlobalContext.Provider value={{ user: user, setUser }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
