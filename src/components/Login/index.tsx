import { signInWithPopup } from '@firebase/auth'
import React, { useState } from 'react'
import { auth, authProvider } from '../../lib/firebase'

const Login: React.FC = () => {
	const [errors, setErrors] = useState('')

	const login = () => {
		signInWithPopup(auth, authProvider).catch((e) => {
			console.log(e)
			setErrors(e.message || 'Something went wrong. Please try again later')
		})
	}

	return (
		<div className="h-screen w-screen flex bg-gray-300 items-center justify-center">
			<div className="bg-white rounded-md p-6 flex items-center flex-col gap-6">
				<img className="w-36 h-36" src="/logo.png" alt="logo" />
				<button
					className="px-6 py-3 rounded-md font-semibold bg-teal-600 text-white"
					onClick={login}
				>
					Log in with Google
				</button>
				{errors && <div className=".error">{errors}</div>}
			</div>
		</div>
	)
}

export default Login
