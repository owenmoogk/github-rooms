import { Redirect } from 'react-router';
import React, { useState } from 'react';

export default function Signup(props) {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [redirect, setRedirect] = useState()
    const [message, setMessage] = useState()

    function handleSignup(e) {
        e.preventDefault();
        fetch('/users/signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'username': username, 'password': password })
        })
            .then(response => response.json())
            .then(json => {
                if (json.token) {
                    localStorage.setItem('token', json.token);
                    props.setLoggedIn(true)
                    props.setUsername(json.username)
                    setRedirect(true)
                }
                else {
                    setMessage(json[Object.keys(json)[0]])
                }
            });
    };

    return (
        <>
            {redirect ?
                <Redirect to='/' />
                : null
            }
            <form onSubmit={e => handleSignup(e)}>
                <h4>Sign Up</h4>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input type="submit" />
            </form>
            <p>{message}</p>
        </>
    );
}