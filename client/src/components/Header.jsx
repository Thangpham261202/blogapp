import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((reposonse) => {
      reposonse.json().then((decoded) => {
        setUserInfo(decoded);
      });
    });
  }, []);
  const logout = () => {
    fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include",
    });
    setUserInfo(null);
  };
  const username = userInfo?.user;
  return (
    <header>
      <div className="logo">
        <a href="/">MyBlog</a>
      </div>
      <nav>
        {username && (
          <>
            <Link to="/">{username}</Link>
            <Link to="/create">Create new post</Link>
            <a href="" onClick={logout}>
              Logout
            </a>
          </>
        )}
        {!username && (
          <>
            <Link to="./login">Login</Link>
            <Link to="./register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
