import React from 'react';
import './Nav.css'

export default function Nav(props) {

    const logged_out_nav = (
        <ul id='nav'>
            <a href='/'>Home</a>
            <a href='/addroom'>Add Room</a>
            <a href='/login'>Login</a>
            <a href='/signup'>Sign Up</a>
        </ul>
    );

    const logged_in_nav = (
        <ul id='nav'>
            <a href='/'>Home</a>
            <a href="/addroom">Add Room</a>
            <a href='/recent'>Recent Commits</a>
            <a onClick={props.handleLogout}>Logout</a>
        </ul>
    );

    return <div>{props.loggedIn ? logged_in_nav : logged_out_nav}</div>;
}