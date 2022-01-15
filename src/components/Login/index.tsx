// import { signInWithPopup } from '@firebase/auth'
import React from 'react'
import { useAuth } from 'store'

const Login: React.FC = () => {
	const { signIn } = useAuth()

	// const login = () => {
	// 	signInWithPopup(auth, authProvider).catch((e) => {
	// 		console.log(e)
	// 		setErrors(e.message || 'Something went wrong. Please try again later')
	// 	})
	// }

	return (
		<div className="flex items-center justify-center w-screen h-screen bg-gray-300">
			<div className="flex flex-col items-center gap-6 p-6 bg-white rounded-md">
				<img className="w-36 h-36" src="/logo.png" alt="logo" />
				<button
					className="px-6 py-3 font-semibold text-white bg-teal-600 rounded-md"
					onClick={signIn}
				>
					Log in with Google
				</button>
			</div>
		</div>
	)
}

export default Login
