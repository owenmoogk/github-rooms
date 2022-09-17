import React, { useState } from 'react';
import { getCookie } from './csrf'

export default function AddRoom(props) {
    function makeNewRoom(name, location) {
        fetch("/api/room/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `JWT ${localStorage.getItem('token')}`,
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({
                name: name,
                location: location
            }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    }

    return (
        <>
            <h4>Add Room</h4>
            <h5>Room name</h5>
            <input
                id='name-input'
                type='text'
                name='Add Room'
            />
            <h5>Location</h5>
            <input
                id='location-input'
                type='text'
                name='Add Room'
            />
            <br/>
            <br/>
            <input type='submit' onClick={() => makeNewRoom(
                document.getElementById('name-input').value,
                document.getElementById('location-input').value)} />
        </>
    )
}