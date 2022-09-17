import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import {getCookie} from './csrf'

export default function Rooms(props) {
    const { id } = useParams();

    function makeNewRoom(){
        
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

    function getRoom(roomNumber){
        fetch("/api/room/"+ roomNumber)
            .then((response) => response.json())
            .then((data) => console.log(data))
    }

    return (
        <>
            <button onClick={() => getRoom(2)}> get room</button>
            <button onClick={() => makeNewRoom()}>make room</button>
        </>
    );
}