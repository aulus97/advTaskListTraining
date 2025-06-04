import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { Outlet, Link, Navigate } from "react-router-dom";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    
    Meteor.loginWithPassword(username, password);
    if(Error)
      return (
        <div>
          <p>Login error!</p>
          <button >
            <nav>
              <Link to="/logIn">Try to log in again</Link>
            </nav>
          </button>
          <hr />
          <button >
            <nav>
              <Link to="/signIn">Sign in, instead</Link>
            </nav>
          </button>
        </div>
      );
    return (<Navigate to="/tasks" />);
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
              <Link to="/signIn">Sign In</Link>
            </nav>
          </button>
        </div>
      </form>
    </div>
  );
};
