"use client";
import styles from "./page.module.css"; // encapsulated style sheet imported
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import User from "@/models/register.model";
import { useRouter } from "next/navigation";

export default function Register() {
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
  });
  const onSubmit = async (data: User) => {
    const request = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await request.json().then((data: any) => {
      sessionStorage.setItem("user", JSON.stringify(data));
      router.replace("/");
    });
    return response;
  };
  async function emaillo(name: string) {
    return false;
  }
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
                {...register("name", { validate: emaillo })}
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
              />
              <div className="text-danger ms-1 mt-1">
                {errors.email?.message}
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
            <button type="submit" className="btn btn-sm btn-primary float-end">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
