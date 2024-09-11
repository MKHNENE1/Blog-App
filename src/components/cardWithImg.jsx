/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import { FaUserCircle } from "react-icons/fa";
import { DefaultSpeedDial } from "./dial";

export function BlogCard(props) {
  const { post, userId, setPost, posts, setPosts } = props;

  return (
    <Card
      color="transparent"
      className="w-full max-w-[40rem] mb-7 bg-white overflow-hidden"
    >
      <CardFooter className="flex flex-row items-center justify-between p-4">
        <div className="flex items-center gap-3 -space-x-3">
          <Tooltip content="Natali Craig">
            <FaUserCircle className="size-11" />
          </Tooltip>
          <div>
            <Typography className=" mx-3 font-normal text-sm sm:text-base">
              {post.user_name}
            </Typography>
          </div>
        </div>
        {location.pathname.startsWith("/auth") && post.user_id == userId ? (
          <DefaultSpeedDial
            post={post}
            posts={posts}
            setPosts={setPosts}
            setPost={setPost}
          />
        ) : null}
      </CardFooter>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className=""
      >
        <img
          src={post.picture}
          alt="ui/ux review check"
          className="h-[400px] mx-auto rounded"
        />
      </CardHeader>
      <CardBody className="p-4">
        <Typography
          variant="h5"
          color="blue-gray"
          className="text-lg sm:text-xl"
        >
          {post.title}
        </Typography>
        <Typography
          variant="lead"
          color="gray"
          className="mt-3 font-normal text-sm sm:text-base"
        >
          {post.content}
        </Typography>
      </CardBody>
    </Card>
  );
}
