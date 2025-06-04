import React from 'react';
import { Outlet, Link } from "react-router-dom";

export const Welcome = () => {
    return (
        <div className='welcome'>
            <h1>Welcome Page</h1>
            <p>Learning more about React Router 6.4 :)</p>
            <p>
                Wanna check your lists?
                Hit the button below and log in!
            </p>
            <div>
                <button 
                    ><nav>
                        <Link to="/tasks">Log In</Link> | 
                    </nav>
                    <Outlet />
                </button>
            </div>
        </div>
    );
}
