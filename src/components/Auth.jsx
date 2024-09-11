/* eslint-disable react/prop-types */
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AddNewPost from "../pages/AddNewPost";
import EditePost from "../pages/EditePost";
function Auth(props) {
  const { posts, setPosts, userId, post, setPost } = props;
  return (
    <>
      {localStorage.getItem("accessToken") ? (
        <Routes>
          <Route
            path="/"
            element={
              <Home
                posts={posts}
                setPosts={setPosts}
                setPost={setPost}
                userId={userId}
              />
            }
          />
          <Route
            path="addnewpost"
            element={
              <AddNewPost posts={posts} userId={userId} setPosts={setPosts} />
            }
          />
          <Route
            path="editepost"
            element={
              <EditePost post={post} setPosts={setPosts} posts={posts} />
            }
          />
        </Routes>
      ) : (
        <h1>you cant go to auth without login frist</h1>
      )}
    </>
  );
}

export default Auth;
