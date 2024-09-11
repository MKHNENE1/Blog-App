/* eslint-disable react/prop-types */
import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
} from "@material-tailwind/react";
import { PlusIcon, CogIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { toast } from "react-toastify";
// import EditePost from "../pages/EditePost";
import { useNavigate } from "react-router-dom";
export function DefaultSpeedDial(props) {
  const { post, setPost, posts, setPosts } = props;
  const nav = useNavigate();
  const deletePost = async () => {
    // console.log(post);
    try {
      // toast.warning("are you sure delete this post");
      if (confirm(`are you sure delete this post`)) {
        await axios.delete(`http://localhost:3000/posts/${post.id}`);
        toast.success("deleted succsessfly");

        const newPosts = posts.filter((p) => p.id !== post.id);
        setPosts(newPosts);
      }
    } catch (error) {
      toast.error("somthing went wrong");
    }
  };
  const editePost = () => {
    // console.log(post);
    setPost(post);
    nav("/auth/editepost");
  };
  return (
    <div className="absolute top-5 right-5 mb-3">
      <SpeedDial placement="left">
        <SpeedDialHandler>
          <IconButton size="md" className="rounded-full">
            <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
          </IconButton>
        </SpeedDialHandler>
        <SpeedDialContent className="flex-row">
          <SpeedDialAction onClick={deletePost}>
            <TrashIcon className="h-5 w-5 text-red-700" />
          </SpeedDialAction>
          <SpeedDialAction onClick={editePost}>
            <CogIcon className="h-5 w-5 text-blue-700" />
          </SpeedDialAction>
        </SpeedDialContent>
      </SpeedDial>
    </div>
  );
}
