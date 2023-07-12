"use client";
import styles from "./page.module.css"; // encapsulated style sheet imported
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import User from "@/models/register.model";
import { useRouter } from "next/navigation";
import { postUser, getAllUsers } from "@/services/user.service";
import { useState } from "react";
export default function Register() {
  const [emailAlreadyTaken, setMessage] = useState<string>("");
  const router = useRouter();

  const validationSchema = Yup.object()
    .shape({
      name: Yup.string().required("Name field is requeired"),
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email format"),
      password: Yup.string()
        .required("password is required")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
      repassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password")], "Passwords do not match"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
  });
  const onSubmit = async (data: User) => {
    const allUsers: User[] = await getAllUsers();
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].email === data.email) {
        setMessage("This email address has already taken");
        return;
      }
    }
    return await postUser(data).then(() => router.replace("/login"));
  };
  const clearMessage = (e: any) => {
    if (e.target.value === "") {
      setMessage("");
    }
  };
  return (
    <>
      {/* imported style page usage*/}
      <div className={styles.main}>
        <h1 className="fw-bold mb-5">Sign Up</h1>
        <div className="p-5 rounded shadow" style={{ width: "35rem" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="exampleNameInput" className="form-label">
                Name
              </label>
              <input
                type="string"
                className="form-control"
                id="exampleNameInput"
                aria-describedby="emailHelp"
                {...register("name")}
              />
              <div className="text-danger ms-1 mt-1">
                {errors.name?.message}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                type="string"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                {...register("email")}
                onChange={clearMessage}
              />
              <div className="text-danger ms-1 mt-1">
                {errors.email?.message}
              </div>
              {emailAlreadyTaken ? (
                <div className="text-danger ms-1 mt-1">{emailAlreadyTaken}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                {...register("password")}
              />
              <div className="text-danger ms-1 mt-1">
                {errors.password
                  ? "Password should contains at least an uppercase,an lowercase and eight characters"
                  : ""}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="repassword" className="form-label">
                Retype Password
              </label>
              <input
                type="password"
                className="form-control"
                id="repassword"
                {...register("repassword", { required: true })}
              />
              <div className="text-danger ms-1 mt-1">
                {errors.repassword?.message}
              </div>
            </div>
            <button
              disabled={!isValid}
              type="submit"
              className="btn btn-sm btn-primary float-end"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
