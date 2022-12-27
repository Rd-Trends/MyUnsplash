import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import Logo from "../components/Logo";
import { FcGoogle } from "react-icons/fc";
import useUser from "../hooks/useUser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../components/Button";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { mutate } from "swr";

interface formData {
  username: string;
  email: string;
  password: string | number;
  customError?: string;
}

const schema = yup
  .object({
    username: yup.string().required("Please enter your full name"),
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
const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { user } = useUser();

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

  const handleSignUp = handleSubmit(async (data) => {
    clearErrors("customError");
    setLoading(true);
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      const user = await response.json();
      setLoading(false);
      mutate(user);
      router.push("/");
    }
    if (response.status >= 400) {
      const err = await response.json();
      setLoading(false);
      setError("customError", { type: "custom", message: err.message });
    }
  });

  return (
    <>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12">
        <div className="bg-white text-[#333333] shadow-xl w-11/12 md:w-5/12 lg:w-4/12 max-w-[400px] flex flex-col items-start py-8 px-4 rounded-lg font-light">
          <Logo />
          <p className="w-full mt-2">Register an account with MyUnsplash</p>
          <form onSubmit={handleSignUp} className="w-full mt-4">
            <label className=" block mb-4">
              Username
              <input
                type="text"
                placeholder="John_doe"
                className="w-full rounded-xl py-2 px-4 border outline-none border-[#4F4F4F] bg-transparent hover:focus:border-[#3DB46D]"
                {...register("username")}
              />
            </label>
            {errors?.username && (
              <p className=" -mt-2 mb-2 text-red-500">
                {errors.username.message}
              </p>
            )}
            <label className=" block mb-4">
              email
              <input
                type="email"
                placeholder="johnDoe@gmail.com"
                className="w-full rounded-xl py-2 px-4 border outline-none border-[#4F4F4F] bg-transparent hover:focus:border-[#3DB46D]"
                {...register("email")}
              />
            </label>
            {errors?.email && (
              <p className=" -mt-2 mb-2 text-red-500">{errors.email.message}</p>
            )}
            <label htmlFor="password" className=" block">
              password
            </label>
            <div className="w-full rounded-xl border outline-none border-[#4F4F4F] bg-transparent hover:focus:border-[#3DB46D] flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="********"
                className="block border-none w-full outline-none py-2 px-4 rounded-md bg-transparent"
                {...register("password")}
              />
              <button
                className="mr-4 py-2"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
            {errors?.password && (
              <p className=" mt-2 mb-2 text-red-500">
                {errors.password.message}
              </p>
            )}
            <Button className="mt-8 w-full" loading={loading}>
              Sign up
            </Button>
            {errors?.customError && (
              <p className=" mt-2 text-red-500">
                {errors?.customError?.message}
              </p>
            )}
          </form>

          <p className="mt-5">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
