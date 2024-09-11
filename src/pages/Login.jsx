/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";

// import { Axios } from "axios";
// import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  // const { setUserId } = props;
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let location = useLocation();
  const nav = useNavigate();
  const onSubmit = async (data) => {
    try {
      // Log in and get the access token
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        data
      );
      const { access_token } = response.data;

      // Store the access token
      localStorage.setItem("accessToken", access_token);

      // Fetch user details
      const userResponse = await axios.get(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const { name } = userResponse.data;

      // Store user details
      localStorage.setItem("username", name);

      toast.success("Login successful");
      nav("/auth");
    } catch (error) {
      toast.error("Invalid email or password");
      console.error("Login error:", error);
    }
  };
  return (
    <div className="flex justify-center items-center mt-3 bg-gray-100 p-4">
      <Card
        color="transparent"
        shadow={false}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
      >
        <Typography variant="h4" color="blue-gray" className="text-center">
          {location.pathname === "/login" ? "Login" : "Register"}
        </Typography>
        <Typography color="gray" className="mt-1 text-center font-normal">
          Nice to meet you! Enter your details to{" "}
          {location.pathname === "/login" ? "log in" : "register"}.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <div className="space-y-2">
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
            <p className="text-red-600">{errors.email?.message}</p>
          </div>

          <div className="space-y-2">
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
            <div className="text-red-600">
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

          <Button onClick={handleSubmit(onSubmit)} className="mt-4" fullWidth>
            Log in
          </Button>

          <Typography color="gray" className="mt-4 text-center font-normal">
            {location.pathname === "/register" ? (
              <>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <>
                Create a new account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:underline inline-block"
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
