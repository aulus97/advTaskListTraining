import { Meteor } from "meteor/meteor";
import React, { Fragment, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Typography } from "@mui/material";
import { ResponsiveTopBar } from "./TopBar";
import Divider from '@mui/material/Divider';

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
        return (navigate("/tasks"));
      }
    });
  };

  const handleSignUpClick = () => {
    return (navigate("/signUp"));
  };
  
  return (
    <div className="login-wrapper">
      <Fragment>
        <ResponsiveTopBar />
        <Box
        component="form"
        /*onSubmit={submit}*/
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        >
          <Typography
          sx={{ my: 2, color: 'white', display: 'block' }}
          >
            Please Log In
          </Typography>
          <TextField 
          /*fullWidth*/
          id="username-l" 
          label="Username" 
          required
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined" 
          />
          <TextField 
          /*fullWidth*/
          id="password-l" 
          label="Password" 
          required
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined" 
          />
          <Button sx={{ my: 2, color: 'white', display: 'block' }}
          onClick={submit}
          variant="contained">
            <Typography
            sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Log In
            </Typography>
          </Button>
          <Divider />
          <Typography
            sx={{ my: 2, color: 'white', display: 'block' }}
            >
            Don't have an account?
          </Typography>
          <Button sx={{ my: 2, color: 'white', display: 'block' }}
          variant="contained"
          onClick={handleSignUpClick}
          >
            <Typography
            sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Sign up
            </Typography>
          </Button>
        </Box>
      </Fragment>
    </div>
  );
};
/*
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
*/