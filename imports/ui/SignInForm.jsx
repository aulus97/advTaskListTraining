import React, { useState } from "react";
import { Navigate  } from "react-router-dom";

export const SignInForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    /*const navigate = useNavigate();
    const handleClick = () => {
        navigate('/logIn');
    };*/

    const submit = (e) => {
        e.preventDefault();

        if (!(Accounts.findUserByUsername(username))) {
            Accounts.createUser({
                username: username,
                password: password,
            });
        }
        return (<Navigate to="/logIn" />);
    };

    return (
    <div className="login-wrapper">
        <h1>Let's Sign In</h1>
        <form onSubmit={() => submit} className="login-form">
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
            <button type="submit">Sign In</button>
        </div>
        </form>
    </div>
    );
};
