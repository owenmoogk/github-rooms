import React, { useState } from 'react';
import './addroom.css'
import { getCookie } from './csrf'

export default function AddRoom(props) {

    const [error, setError] = useState()

    function makeNewRoom(name, location) {
        if (!name || !location){
            setError('Please fill in all fields.')
            return
        }
        fetch("/api/room/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({
                name: name,
                location: location
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                window.location.href = "http://127.0.0.1:8000/room/" + data.id
            });
    }

    return (
        <div id='roomPage'>
            <h1>Add Room</h1>
            <br/>
            <br/>
            <input
                className='addRoomInput'
                id='name-input'
                type='text'
                name='Add Room'
                placeholder='Room Name (eg. 123456)'
            />
            <input
                className='addRoomInput'
                id='location-input'
                type='text'
                name='Add Room'
                placeholder='Location (eg. University of Waterloo)'
            />
            <span id='error'>{error}</span>
            <button type='submit' onClick={() => makeNewRoom(
                document.getElementById('name-input').value,
                document.getElementById('location-input').value
            )}>Make Room!</button>
        </div>
    )
}