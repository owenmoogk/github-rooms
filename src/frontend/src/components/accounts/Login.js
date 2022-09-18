import React, { useState } from 'react';
import { Redirect } from 'react-router';

export default function LoginForm(props) {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [message, setMessage] = useState()
    const [redirect, setRedirect] = useState()

    function handleLogin(e) {
        e.preventDefault();
        fetch('/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        })
            .then(response => response.json())
            .then(json => {
                if (json.token) {
                    localStorage.setItem('token', json.token);
                    props.setLoggedIn(true)
                    props.setUsername(json.user.username)
                    setRedirect(true)
                }
                else{
                    setMessage(json[Object.keys(json)[0]])
                }
            });
    };

    return (
        <div id='login'>
            {redirect ?
                <Redirect to='/' />
                : null
            }
            <form onSubmit={e => handleLogin(e)} style={{
                display: 'flex',
                flexDirection: "column",
                justifyContent: 'center',
                alignItems: "center"
            }}>
                <h1>Login</h1>
                <input
                className='addRoomInput'
                    type="text"
                    name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder='Username'
                />
                <br/>
                <input
                className='addRoomInput'
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder='Password'
                />
                <br/>

                <input type="submit" style={{marginTop: "20px", width: "150px"}} />
            </form>
            <p>{message}</p>
        </div>
    );
}