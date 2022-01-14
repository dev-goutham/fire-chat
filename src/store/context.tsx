import { signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from 'lib/firebase'
import React, { createContext, useCallback, useEffect } from 'react'
import { useAuthReducer } from './reducer'
import { IAuthContext } from './types'
import { signInWithGoogle } from 'utils/signInWithGoogle'
import { createUser } from 'utils/createUser'
import { getUser } from 'utils/getUser'

const AuthContext = createContext<IAuthContext>({
	error: null,
	loading: true,
	user: null,
	signIn: async () => {
		console.log('signin')
	},
	signOut: async () => {
		console.log('signout')
	},
})

const AuthProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useAuthReducer()

	const signIn = useCallback(async () => {
		try {
			const { success, error: signinError } = await signInWithGoogle()

			if (!success) {
				dispatch({
					type: 'AUTH_ERROR',
					payload: signinError,
				})
			}
		} catch (error) {
			dispatch({
				type: 'AUTH_ERROR',
				payload: 'Something went wrong',
			})
		}
	}, [dispatch, signInWithGoogle, createUser])

	const signOut = async () => {
		await firebaseSignOut(auth)
	}

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			if (!user) {
				dispatch({
					type: 'AUTH_STATE_CHANGED',
					payload: user,
				})
				return
			}
			if (user) {
				createUser(user)
					.then(() => {
						// getUser(user.uid).then((u) => {
						// 	dispatch({
						// 		type: 'AUTH_STATE_CHANGED',
						// 		payload: u!,
						// 	})
						// })
						dispatch({
							type: 'AUTH_STATE_CHANGED',
							payload: user,
						})
					})
					.catch(() => {
						dispatch({
							type: 'AUTH_ERROR',
							payload: 'Something went wrong',
						})
					})
			}
		})
		return unsub
	}, [dispatch, onAuthStateChanged])

	return (
		<AuthContext.Provider
			value={{
				error: state.error,
				loading: state.fetching,
				signIn,
				signOut,
				user: state.user,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthContext, AuthProvider }
