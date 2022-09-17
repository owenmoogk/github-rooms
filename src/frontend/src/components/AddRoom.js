import React, { useState } from 'react';

export default function AddRoom(props) {
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
            <input type='submit'/>
        </form>
    )
}