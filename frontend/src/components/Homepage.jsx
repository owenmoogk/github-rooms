import React, { useEffect, useState } from 'react';
import "./homepage.css"

export default function Homepage(){

  return (
    <div className='homepage'>
      <h1>Github Rooms</h1>
      <p className='subtitle'>A software dev's LinkedIn.</p>
      <input id='roomInput' placeholder='Room # (ex. 123456)' type='number'></input>
      <button onClick={() => window.location.href = "http://127.0.0.1:8000/room/" + document.getElementById('roomInput').value}>Go!</button>
      <p>Or, scan the barcode!</p>
      <a id='addBarcode'></a>
    </div>
  )
}