import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    
    Meteor.loginWithPassword(username, password, (err) => {
      if (err) {
        setError(err.reason || "Login failed");
      } else {
        navigate("/tasks");
      }
    });
  };
  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={submit} className="login-form">
        <div>
          <label htmlFor="username">Username</label>

          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>

          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Log In</button>
          <hr />
          <button >
            Don't have an account?
            <nav>
              <Link to="/signUp">Sign up</Link>
            </nav>
          </button>
        </div>
      </form>
    </div>
  );
};
