import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login, error } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    if (!error) {
      navigate("/");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="login-heading">Login to Pizppy</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <label className="login-label" htmlFor="Email">
            Enter your Email:
          </label>
          <input
            type="email"
            className="login-input"
            id="Email"
            placeholder="name@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="login-label" htmlFor="Password">
            Enter your Password:
          </label>
          <input
            type="password"
            className="login-input login-input--password"
            id="Password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-submit-btn">
            Submit
          </button>
          {error && <p className="login-error">{error}</p>}{" "}
          {/* Display error message if present */}
        </form>
      </div>
    </div>
  );
}

export default Login;
