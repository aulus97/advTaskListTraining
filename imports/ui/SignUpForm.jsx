import React, { Fragment, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Accounts } from 'meteor/accounts-base';
import { ResponsiveTopBar } from "./TopBar";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Typography } from "@mui/material";


export const SignUpForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    
    const submit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        Accounts.createUser({
            username: username,
            password: password,
            profile: {
                fullName: "",
                mail: "",
                birthdate: "",
                gender: "",
                company: "",
                photo: null
            }
        }, (err) => {
            if (err) {
                setError(err.reason || "Sign up failed");
                return (navigate("/signUp"));
            } else {
                setLoading(false);
                return (navigate("/logIn"));
            }
        });
    };
    return (
        <div className="login-wrapper">
            <Fragment>
                <ResponsiveTopBar />
                <Box
                component="form"
                onSubmit={submit}
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
                >
                    <TextField 
                        fullWidth
                        id="username" 
                        label="Set an username" 
                        required
                        onChange={(e) => setUsername(e.target.value)}
                        variant="outlined"
                        disabled={loading} 
                    />
                    <TextField 
                        fullWidth
                        id="password" 
                        label="Set your password" 
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        disabled={loading} 
                    />
                    <Button sx={{ my: 2, color: 'white', display: 'block' }}
                    type="submit"
                    loadingPosition="end"
                    disabled={loading}
                    >
                        <Typography
                        sx={{ my: 2, color: 'white', display: 'block' }}>
                            {loading ? "Signing Up..." : "Sign up"}
                        </Typography>
                    </Button>
                </Box>
            </Fragment>
        </div>
    );
};
