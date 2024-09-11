/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { DefaultSpeedDial } from "./dial";
import { FaUserCircle } from "react-icons/fa";
export function TestimonialCard(props) {
  const { post, userId, setPost, posts, setPosts } = props;
  return (
    <Card color="transparent" className="w-full max-w-[40rem] bg-white mb-7">
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="flex items-center gap-4 pt-0 pb-2"
      >
        <div className="flex items-center gap-3 -space-x-3">
          <div className="">
            <FaUserCircle className="size-11" />
          </div>
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <Typography variant="h5" color="blue-gray" className="ml-4">
                {post.user_name}
              </Typography>
            </div>
            <Typography className="mx-4 " color="blue-gray">
              {post.title}
            </Typography>
          </div>
        </div>
      </CardHeader>
      {location.pathname.startsWith("/auth") && post.user_id == userId ? (
        <DefaultSpeedDial
          post={post}
          posts={posts}
          setPosts={setPosts}
          setPost={setPost}
        />
      ) : null}
      <CardBody className="p-4">
        <Typography>{post.content}</Typography>
      </CardBody>
    </Card>
  );
}
