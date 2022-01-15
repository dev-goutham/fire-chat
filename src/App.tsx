import Loading from 'components/Loading'
import Main from 'components/Main'
import Sidebar from 'components/Sidebar'
import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useAuth } from 'store'
import Login from './components/Login'

const RedirectToChannel: React.FC = () => {
	return <Navigate to="/channels/uJXZfdws3sBgUOiXypQT" />
}

const App: React.FC = () => {
	const { user, loading } = useAuth()

	if (loading) {
		return (
			<div className="flex justify-center align-middle h-vw w-vw">
				<Loading />
			</div>
		)
	}

	if (!user) {
		return <Login />
	}

	return (
		<div className="flex w-screen h-screen overflow-x-hidden ">
			<BrowserRouter>
				<Sidebar />
				<Routes>
					<Route path="/" element={<RedirectToChannel />} />
					<Route path="/channels/:id" element={<Main />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
