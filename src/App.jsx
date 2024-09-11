// import Example from "./components/Button";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavbarDefault } from "./components/navbars/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUP from "./pages/Register";
import Auth from "./components/Auth";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// import { useLocation } from "react-router-dom";

function App() {
  let [userId, setUserId] = useState();
  const [post, setPost] = useState();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    // console.log(userId);
    // console.log(token);
    if (token) {
      const decoded = jwtDecode(token);
      // console.log(decoded);
      const idUser = decoded["sub"];
      // console.log(idUser);
      setUserId(idUser);
    }
  }, [userId]);
  // const location = useLocation();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/posts").then((res) => {
      // console.log(res.data);
      setPosts(res.data.reverse());
    });
  }, []);
  // console.log("token", localStorage.getItem("accessToken"));
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <div className="flex flex-col bg-gray-100">
          <NavbarDefault />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Home posts={posts} />} />
              <Route
                path="/auth/*"
                element={
                  <Auth
                    posts={posts}
                    post={post}
                    setPost={setPost}
                    setPosts={setPosts}
                    userId={userId}
                  />
                }
              />
              <Route path="/login" element={<Login setUserId={setUserId} />} />
              <Route path="/register" element={<SignUP />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
