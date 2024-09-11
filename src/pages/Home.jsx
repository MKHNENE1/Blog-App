/* eslint-disable react/prop-types */
// import axios from "axios";
// import { useEffect, useState } from "react";
import { TestimonialCard } from "../components/Card";
import { BlogCard } from "../components/cardWithImg";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";

// import Icon from "@mui/material/Icon";
export default function Home(props) {
  const { posts, userId, setPost, setPosts } = props;
  // console.log(posts);
  const location = useLocation();

  return (
    <>
      {location.pathname.startsWith("/auth") ? (
        <div
          style={{
            position: "fixed",
            bottom: "10%",
            left: "87%",
            zIndex: 4,
          }}
        >
          <div className=" gap-x-1">
            <Link to="/auth/addnewpost">
              <Button fullWidth variant="gradient" size="sm" className=" ">
                <CiCirclePlus className="size-8" />
              </Button>
            </Link>
          </div>
        </div>
      ) : null}

      {posts.map((post) => (
        <div
          key={post.id}
          className=" bg-gray-100
     flex flex-col justify-center items-center"
        >
          {!post.picture ? (
            <>
              <TestimonialCard
                posts={posts}
                setPosts={setPosts}
                setPost={setPost}
                userId={userId}
                post={post}
              />
            </>
          ) : (
            <>
              <BlogCard
                userId={userId}
                setPost={setPost}
                post={post}
                posts={posts}
                setPosts={setPosts}
              />
            </>
          )}
        </div>
      ))}
    </>
  );
}
