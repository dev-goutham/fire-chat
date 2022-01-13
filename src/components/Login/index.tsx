import { signInWithPopup } from '@firebase/auth'
import React, { useState } from 'react'
import { auth, authProvider } from '../../lib/firebase'
import StyledLogin from './styles'

const Login: React.FC = () => {
	const [errors, setErrors] = useState('')

	const login = () => {
		signInWithPopup(auth, authProvider).catch((e) => {
			console.log(e)
			setErrors(e.message || 'Something went wrong. Please try again later')
		})
	}

	return (
		<StyledLogin>
			<div className="card">
				<img src="/logo.png" alt="" />
				<button onClick={login}>Log in with Google</button>
				{errors && <div className=".error">{errors}</div>}
			</div>
		</StyledLogin>
	)
}

export default Login
