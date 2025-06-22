import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Login from './components/accounts/Login';
import Signup from './components/accounts/Signup';
import Homepage from './components/Homepage';
import Room from './components/Rooms';
import AddRoom from './components/AddRoom';
import {
	BrowserRouter ,
	Route,
	Routes
} from 'react-router-dom'

export default function App(props) {

	const [username, setUsername] = useState()
	const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false)

	function handleLogout() {
		localStorage.removeItem('token');
		setLoggedIn(false)
		setUsername('')
	};

	useEffect(() => {
		if (loggedIn) {
			fetch('/users/current_user/', {
				headers: {
					Authorization: `JWT ${localStorage.getItem('token')}`
				}
			})
				.then(response => response.json())
				.then(json => {
					if (json.username) {
						setUsername(json.username)
					}
					else {
						handleLogout()
					}
				});
		}
	})

	return (

		<BrowserRouter>
			<Nav loggedIn={handleLogout} handleLogout={handleLogout} />
			<Routes>
				<Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUsername={setUsername} />} />
				<Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} setUsername={setUsername} />} />
				<Route path="/room/:id" element={<Room loggedIn={loggedIn} />} />
				<Route path="/add-room" element={<AddRoom />} />
				<Route path="/" element={<Homepage />} />
			</Routes>
		</BrowserRouter>
	);
}