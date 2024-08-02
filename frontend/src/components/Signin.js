import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { signup, error } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    await signup(name, email, password, passwordConfirm);
    if (!error) {
      navigate("/");
    }
  };

  return (
    <div className="signin-page">
      <div className=" signin-box">
        <h1 className="signin-heading">Sign Up for Pizppy</h1>
        <form className="signin-form" onSubmit={handleSignUp}>
          <label className="signin-label" htmlFor="Name">
            Enter your Name:
          </label>
          <input
            type="text"
            className="signin-input"
            id="Name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="signin-label" htmlFor="Email">
            Enter your Email:
          </label>
          <input
            type="email"
            className="signin-input"
            id="Email"
            placeholder="name@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="signin-label" htmlFor="Password">
            Enter your Password:
          </label>
          <input
            type="password"
            className="signin-input signin-input--password"
            id="Password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="signin-label" htmlFor="PasswordConfirm">
            Confirm your Password:
          </label>
          <input
            type="password"
            className="signin-input signin-input--password"
            id="PasswordConfirm"
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
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

export default SignUp;
