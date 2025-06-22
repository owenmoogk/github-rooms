import { useState } from 'react';
import { Navigate } from 'react-router-dom';

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
        <div id='signup'>
            {redirect ?
                <Navigate to='/' />
                : null
            }
            <form onSubmit={e => handleSignup(e)} style={{
                display: 'flex',
                flexDirection: "column",
                justifyContent: 'center',
                alignItems: "center"
            }}>
                <h1>Sign Up</h1>
                <br></br>
                <br></br>
                <input
                className='addRoomInput'
                    type="text"
                    name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                className='addRoomInput'
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input type="submit"/>
            </form>
            <p>{message}</p>
        </div>
    );
}