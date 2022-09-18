import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import QRCode from "react-qr-code";
import { getCookie } from './csrf';
import './rooms.css'
import GithubCard from './Card';

export default function Rooms(props) {
    const { id } = useParams()
    const [roomData, setRoomData] = useState({})
    const [error, setError] = useState()

    function getRoomData(roomNumber) {
        fetch("/api/room/" + roomNumber)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setRoomData(data)
            })
    }

    function postProjectData(apiURL) {
        // validate url
        var data = {method: "GET"}
        if (localStorage.getItem('apikey')){
            data["headers"] = {"authorization":"token " + localStorage.getItem('apikey')}
        }
        fetch(apiURL, data)
            .then(response => {
                if (response.status == 200) {
                    fetch("/projects/project/", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': getCookie('csrftoken'),
                            Authorization: `JWT ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({
                            apiURL: apiURL,
                            room: id
                        }),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            location.reload()
                        });
                }
                else {
                    setError('Error accessing repo.')
                }
            })
    }

    useEffect(() => {
        getRoomData(id);
    }, [])

    return (
        <div id='roompage'>
            {
                roomData.name ?
                    <>
                        <p>Name: {roomData.name}</p>
                        <p>Location: {roomData.location}</p>
                        <p>ID: {roomData.id}</p>
                        <QRCode value={"http://127.0.0.1:8000/room/" + id} />
                        {
                            props.loggedIn ? <>
                                <button onClick={() => postProjectData("https://api.github.com/repos/" + document.getElementById('addProjectInput').value)}>Add Project</button>
                                <span style={{ color: 'red', marginTop: '10px' }}>{error}</span>
                                <br />
                                <input
                                    id='addProjectInput'
                                    type='text'
                                    name='Add Project'
                                    placeholder='Project name (e.g. owenmoogk/github-rooms)'
                                />
                            </> : null
                        }
                        <h2>Projects made here!</h2>
                        <div id='cardHolder'>
                            {roomData.projects.map(url => <GithubCard apiURL={url}/>)}
                        </div>

                    </>
                    : roomData.failure ?
                        <>
                            <h1>Github Rooms</h1>
                            <br />
                            <p>Room does not exist :(</p>
                            <p>Redirecting you to the homepage.</p>
                            <div style={{ display: 'none' }}>{setTimeout(() => window.location.href = "http://127.0.0.1:8000/", 3000)}</div>
                        </>
                        : null
            }
        </div>
    );
}