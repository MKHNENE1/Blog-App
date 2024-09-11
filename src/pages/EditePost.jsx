/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
//
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditePost(props) {
  const { userId, post, setPosts, posts } = props;
  // console.log(post);
  const [postData, setPostData] = useState(post);
  // console.log(postData);
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let location = useLocation();
  const handleChange = (e) => {
    // console.log(e.target.value);
    let newData = { ...postData };
    newData[e.target.name] = e.target.value;
    setPostData(newData);
  };
  const nav = useNavigate();
  const onSubmit = (data) => {
    // console.log(userId);
    axios
      .patch(`http://localhost:3000/posts/${post.id}`, {
        ...data,
        user_id: userId,
        user_name: localStorage.getItem("username"),
      })
      .then((res) => {
        // console.log(res);
        const newPosts = [...posts];
        const index = newPosts.findIndex((p) => p.id === post.id);
        newPosts[index] = { ...newPosts[index], ...res.data };

        setPosts(newPosts);
        // console.log(posts);
        toast.success("EDITE post sucsessfully");
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
          Edit POST
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
              onChange={handleChange}
              value={postData.title}
              containerProps={{ className: "min-w-[100px]" }}
            />
            <p className="text-red-600">{errors.title?.message}</p>

            <Typography variant="h6" color="blue-gray">
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
              onChange={handleChange}
              value={postData.content}
              containerProps={{ className: "min-w-[100px]" }}
            />
            <p className="text-red-600">{errors.content?.message}</p>

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
              value={postData.picture}
              onChange={handleChange}
              containerProps={{ className: "min-w-[100px]" }}
            />
            <p className="text-red-600">{errors.picture?.message}</p>
          </div>

          <Button onClick={handleSubmit(onSubmit)} className="mt-6" fullWidth>
            Edit POST
          </Button>
        </form>
      </Card>
    </div>
  );
}
