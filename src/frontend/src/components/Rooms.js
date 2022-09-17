import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import {getCookie} from './csrf'

export default function Rooms(props) {
    const { id } = useParams();

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