/* eslint-disable no-unused-vars */
import React from "react";
import { Navbar, Typography, Button } from "@material-tailwind/react";
import { PowerIcon } from "@heroicons/react/24/solid";

import { Link, useLocation, useNavigate } from "react-router-dom";

export function NavbarDefault() {
  const location = useLocation();
  const nav = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    nav("/");
  };

  return (
    <Navbar className="rounded-t-none mx-auto py-2 lg:py-4 max-w-screen-xl">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        {location.pathname.startsWith("/auth") ? (
          <Typography
            as="Link"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            <span>HOME</span>
          </Typography>
        ) : (
          <Link to="/">HOME</Link>
        )}
        {location.pathname == "/login" ? (
          <div className="flex items-center gap-x-1">
            <Link to="/register">
              <Button variant="gradient" size="sm" className="inline-block">
                <span>Sigh Up</span>
              </Button>
            </Link>
          </div>
        ) : location.pathname == "/register" ? (
          <div className="flex items-center gap-x-1">
            <Link to="/login">
              <Button variant="gradient" size="sm" className="inline-block">
                <span>Log In</span>
              </Button>
            </Link>
          </div>
        ) : location.pathname.startsWith("/auth") ? (
          <div className="flex items-center gap-x-1">
            <Link to="/">
              <Button
                onClick={handleLogOut}
                variant="gradient"
                size="sm"
                className="inline-block"
              >
                <span>
                  LOG OUT <PowerIcon className="h-4 w-4 inline" />
                </span>
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-x-1">
            <Link to="/login">
              <Button variant="gradient" size="sm" className="inline-block">
                <span>Log In</span>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Navbar>
  );
}
