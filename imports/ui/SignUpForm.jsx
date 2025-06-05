import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Accounts } from 'meteor/accounts-base';

export const SignUpForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();

        Accounts.createUser({
            username: username,
            password: password
        }, (err) => {
            if (err) {
                setError(err.reason || "Sign up failed");
            } else {
                navigate("/logIn");
            }
        });
    };
    return (
    <div className="login-wrapper">
        <h1>Let's sign up!</h1>
        <form onSubmit={submit} className="login-form">
        <div>
            <label htmlFor="username">Set an username</label>

            <input
            type="text"
            placeholder="Username"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="password">Set your password</label>

            <input
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div>
            <button type="submit">Sign up</button>
        </div>
        </form>
    </div>
    );
};
