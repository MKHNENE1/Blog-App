/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
//
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddNewPost(props) {
  const { posts, setPosts, userId } = props;
  // console.log(posts);
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let location = useLocation();
  const nav = useNavigate();
  const onSubmit = (data) => {
    // console.log(userId);
    axios
      .post("http://localhost:3000/posts", {
        ...data,
        user_id: userId,
        user_name: localStorage.getItem("username"),
      })
      .then((res) => {
        const oldPosts = [...posts];
        oldPosts.unshift(res.data);
        setPosts(oldPosts);
        // console.log(posts);
        toast.success("Add post sucsessfully");
        nav("/auth");
      })
      .catch((res) => {
        toast.error("some thing went wrong");
        // console.log(res);
      });
  };
  return (
    <div className="flex justify-center items-center mt-10 bg-gray-100 p-4">
      <Card
        color="transparent"
        shadow={false}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
      >
        <Typography variant="h4" color="blue-gray" className="text-center">
          {location.pathname === "/addnewpost" ? "ADD NEW POST" : "REGISTER"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <div className="space-y-2">
            <Typography variant="h6" color="blue-gray">
              Post Title
            </Typography>
            <Input
              {...register("title", {
                required: "This title is required",
              })}
              size="lg"
              placeholder="Your post title"
              className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[100px]" }}
            />
            <p className="text-red-600">{errors.title?.message}</p>
            <Typography variant="h6" color="blue-gray" className="pt-2">
              Post Content
            </Typography>
            <Input
              {...register("content", {
                required: "This content is required",
              })}
              size="lg"
              placeholder="Post content"
              className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[100px]" }}
            />
            <p className="text-red-600">{errors.content?.message}</p>
            {/* Uncomment if you want to include a picture input */}
            <Typography variant="h6" color="blue-gray">
              Post Picture
            </Typography>
            <Input
              {...register("picture")}
              size="lg"
              placeholder="Post picture URL"
              className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[100px]" }}
            />
            <p className="text-red-600">{errors.picture?.message}</p>
          </div>
          <Button onClick={handleSubmit(onSubmit)} className="mt-6" fullWidth>
            ADD NEW POST
          </Button>
        </form>
      </Card>
    </div>
  );
}
