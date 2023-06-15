import React, { useState } from "react";
import Alerst from "../alerts/Alerst";
function Register() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  async function register(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ user, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("đăng kí thành công");
    } else {
      alert("registration failed");
    }
  }
  return (
    <form className="form" action="" onSubmit={register}>
      <h1>Register</h1>
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
      <button>Register</button>
    </form>
  );
}

export default Register;
