import Main from 'components/Main'
import Sidebar from 'components/Sidebar'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAuth } from 'store'
import Login from './components/Login'

const App: React.FC = () => {
	const { user } = useAuth()

	if (!user) {
		return <Login />
	}

	return (
		<div className="flex">
			<BrowserRouter>
				<Sidebar />
				<Routes>
					<Route path="/" element={<div>room</div>} />
					<Route path="/rooms/:id" element={<Main />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
