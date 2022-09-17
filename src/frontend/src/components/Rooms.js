import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import QRCode from "react-qr-code";

export default function Rooms(props) {
    const { id } = useParams();

    function getRoom(roomNumber){
        fetch("/api/room/"+ roomNumber)
            .then((response) => response.json())
            .then((data) => console.log(data))
    }

    return (
        <>
            <QRCode value={"http://127.0.0.1:8000/room/"+id} />
            <button onClick={() => getRoom(2)}> get room</button>
            <button onClick={() => makeNewRoom()}>make room</button>
        </>
    );
}