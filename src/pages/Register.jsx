/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
//
import { Card, Input, Button, Typography } from "@material-tailwind/react";

import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUP() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let location = useLocation();
  const nav = useNavigate();

  const onSubmit = (data) => {
    // console.log(data);
    const sentData = {
      ...data,
      avatar: "https://picsum.photos/800",
    };
    // console.log(sentData);
    axios
      .post("https://api.escuelajs.co/api/v1/users", sentData)
      .then((res) => {
        // console.log(res.data);
        toast.success("Add user sucsessfully");
        nav("/login");
      })
      .catch((res) => {
        toast.error("some thing went wrong");
        // console.log(res);
      });
  };
  return (
    <div className="flex justify-center items-center mt-3 bg-gray-100 p-4">
      <Card
        color="transparent"
        shadow={false}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
      >
        <Typography variant="h4" color="blue-gray" className="text-center">
          {location.pathname === "/login" ? "Login" : "Sign Up"}
        </Typography>
        <Typography color="gray" className="mt-1 text-center font-normal">
          Nice to meet you! Enter your details to{" "}
          {location.pathname === "/login" ? "log in" : "register"}.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Typography variant="h6" color="blue-gray">
                Your Name
              </Typography>
              <Input
                {...register("name", {
                  required: "This name is required",
                  pattern: {
                    value: /^[a-zA-Z'. -]{5,}$/,
                    message:
                      "Name must contain characters only and be at least 5 characters long.",
                  },
                })}
                size="lg"
                placeholder="Your Name"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
              />
              <p className="text-red-600 mt-1">{errors.name?.message}</p>
            </div>

            <div>
              <Typography variant="h6" color="blue-gray">
                Your Email
              </Typography>
              <Input
                {...register("email", {
                  required: "This email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                size="lg"
                placeholder="name@mail.com"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
              />
              <p className="text-red-600 mt-1">{errors.email?.message}</p>
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                Password
              </Typography>
              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Password must be at least 4 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password cannot exceed 12 characters",
                  },
                })}
                type="password"
                size="lg"
                placeholder="********"
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[100px]" }}
              />
              <div className="text-red-600 mt-1">
                {errors.password && (
                  <ul>
                    {errors.password.message
                      .split("\n")
                      .map((errorMessage, index) => (
                        <li key={index}>{errorMessage}</li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <Button onClick={handleSubmit(onSubmit)} className="mt-4" fullWidth>
            Sign Up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            {location.pathname === "/register" ? (
              <>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:underline inline-block"
                >
                  Log In
                </Link>
              </>
            ) : (
              <>
                Create a new account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Sign Up
                </Link>
              </>
            )}
          </Typography>
        </form>
      </Card>
    </div>
  );
}
