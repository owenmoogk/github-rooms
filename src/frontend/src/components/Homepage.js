import React, { useEffect, useState } from 'react';
import "./homepage.css"

export default function Homepage(){

  return (
    <div className='homepage'>
      <h1>Github Rooms</h1>
      <p className='subtitle'>A software dev's LinkedIn.</p>
      <input placeholder='Room # (ex. 123456)'></input>
      <p>Or, scan the barcode!</p>
      <a id='addBarcode'></a>
    </div>
  )
}