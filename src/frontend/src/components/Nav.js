import React from 'react';

export default function Nav(props) {

    const logged_out_nav = (
        <ul>
            <a href='/'>Github Rooms</a>
            <a href='/login'>login</a>
            <a href='/signup'>signup</a>
        </ul>
    );

    const logged_in_nav = (
        <ul>
            <a href='/'>home</a>
            <br />
            <a onClick={props.handleLogout}>logout</a>
        </ul>
    );

    return <div>{props.loggedIn ? logged_in_nav : logged_out_nav}</div>;
}