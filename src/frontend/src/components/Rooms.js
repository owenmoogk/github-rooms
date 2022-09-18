import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import QRCode from "react-qr-code";
import './rooms.css'

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
        <div id='roompage'>
            {
                roomData.name ? <>
                    <p>Name: {roomData.name}</p>
                    <p>Location: {roomData.location}</p>
                    <p>ID: {roomData.id}</p>
                    <QRCode value={"http://127.0.0.1:8000/room/"+id} />
                </>
                : 
                <>
                    <h1>Github Rooms</h1>
                    <br/>
                    <p>Room does not exist :(</p>
                    <p>Redirecting you to the homepage.</p>
                    <div style={{display: 'none'}}>{setTimeout(() => window.location.href = "http://127.0.0.1:8000/", 3000)}</div>
                </>
            }
        </div>
    );
}