import { auth, db } from 'lib/firebase'
import React, { createContext, useCallback, useEffect } from 'react'
import { useAuthReducer } from './reducer'
import { IAuthContext } from './types'
import { signInWithGoogle } from 'utils/signInWithGoogle'
import { createUser } from 'utils/createUser'

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
			const { success, user } = await signInWithGoogle()

			if (!success) {
				dispatch({
					type: 'AUTH_ERROR',
					payload: 'something went wronf',
				})
			}

			await db.collection('users').doc(user?.uid).update({
				is_online: true,
			})
		} catch (error) {
			dispatch({
				type: 'AUTH_ERROR',
				payload: 'Something went wrong',
			})
		}
	}, [dispatch, signInWithGoogle, createUser])

	const signOut = async () => {
		await auth.signOut()
		await db.collection('users').doc(state.user?.uid).update({
			is_online: false,
		})
	}

	useEffect(() => {
		const unsub = auth.onAuthStateChanged((user) => {
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
	}, [dispatch])

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
