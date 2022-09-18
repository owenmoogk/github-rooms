import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import QRCode from "react-qr-code";

export default function Rooms(props) {
    const { id } = useParams()
    const [roomData, setRoomData] = useState({})

    function getRoomData(roomNumber){
        fetch("/api/room/"+ roomNumber)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setRoomData(data)
            })
    }

    useEffect(() => {
        getRoomData(id);
    }, []);

    return (
        <>
            <p>Name: {roomData.name}</p>
            <p>Location: {roomData.location}</p>
            <QRCode value={"http://127.0.0.1:8000/room/"+id} />
        </>
    );
}