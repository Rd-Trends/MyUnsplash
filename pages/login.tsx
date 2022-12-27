import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "../components/Logo";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useUser from "../hooks/useUser";
import * as yup from "yup";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Button from "../components/Button";

interface formData {
  email: string;
  password: string | number;
  customError?: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .email("please enter a valid email address")
      .required("Your email address must be provided"),
    password: yup
      .string()
      .min(6, "Password length must be greater than six")
      .required("Please enter your password"),
  })
  .required();

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { user, mutate } = useUser();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<formData>({ resolver: yupResolver(schema) });

  const handleLogin = handleSubmit(async (data) => {
    setLoading(true);
    clearErrors("customError");
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const user = await response.json();
      setLoading(false);
      mutate(user);
      router.push("/");
    }
    if (response.status === 401 || response.status === 500) {
      const err = await response.json();
      setLoading(false);
      setError("customError", { type: "custom", message: err.message });
    }
  });

  return (
    <>
      <div className="bg-gray-50 text-darkgrey  min-h-screen flex items-center justify-center py-12">
        <div className="bg-white font-normal shadow-xl w-11/12 md:w-5/12 lg:w-4/12 max-w-[400px] flex flex-col items-start py-8 px-4 rounded-lg">
          <Logo />
          <p className="w-full mt-2">Please sign in into your account</p>
          <form onSubmit={handleLogin} className="w-full mt-6">
            <label className=" block mb-4">
              email
              <input
                type="email"
                placeholder="johnDoe@gmail.com"
                className="w-full rounded-xl py-2 px-4 mt-1 border outline-none border-secondary bg-transparent hover:focus:border-primary"
                {...register("email")}
              />
            </label>
            {errors?.email && (
              <p className=" -mt-2 mb-2 text-danger">{errors.email.message}</p>
            )}
            <label htmlFor="password" className=" block mb-1">
              password
            </label>
            <div className="w-full rounded-xl border outline-none border-secondary bg-transparent hover:focus:border-primary flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="********"
                className="block border-none w-full outline-none py-2 px-4 rounded-md bg-transparent"
                {...register("password")}
              />
              <button
                className="mr-4 outline-none bg-transparent h-full py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
            {errors?.password && (
              <p className=" mt-2 mb-2 text-danger">
                {errors.password.message}
              </p>
            )}
            <Button loading={loading} className="mt-8 w-full">
              Sign in
            </Button>
            {errors?.customError && (
              <p className=" mt-2 text-danger">
                {errors?.customError?.message}
              </p>
            )}
          </form>

          <p className="mt-5">
            {" Don't have an account?"}{" "}
            <Link href="/signup" className="text-primary font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
