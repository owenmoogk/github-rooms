import React, { useState } from 'react';
import {getCookie} from './csrf'

export default function AddRoom(props) {
    function makeNewRoom() {

        const newRoomOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `JWT ${localStorage.getItem('token')}`,
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({
                name: 'insertRoomNameHere',
                location: "insertRoomLocationHere"
            }),
        };

        fetch("/api/room/", newRoomOptions)
            .then((response) => response.json())
            .then((data) => console.log(data));
    }

    function handleAddRoom(e) {
        e.preventDefault()
    }
    const [roomnumber, setRoomnumber] = useState()
    return (
        <form onSubmit={e => handleAddRoom(e)}>
            <h4>Add Room</h4>
            <input
                type='number'
                name='Add Room'
                value={roomnumber}
                onChange={e => setRoomnumber(e.target.value)}
            />
            <input type='submit' />
        </form>
    )
}