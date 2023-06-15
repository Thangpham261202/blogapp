import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import Loading from "../loading/loading";
function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);
  async function login(e) {
    e.preventDefault();
    setLoading(true);
    const reponse = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ user, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    console.log(reponse.ok);
    if (reponse.ok) {
      reponse.json().then((user) => {
        setUserInfo(user);
        setLoading(false);
      });
      navigate("/");
    }
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <form className="form" action="" onSubmit={login}>
          <h1>Login</h1>
          <div className="form-group">
            <label htmlFor="username">Tài khoản</label>
            <input
              name="username"
              type="text"
              placeholder="Username"
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button>Login</button>
        </form>
      )}
    </>
  );
}

export default Login;
