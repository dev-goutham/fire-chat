import { User, AuthError, signInWithPopup } from 'firebase/auth'
import { auth, authProvider } from 'lib/firebase'

export const signInWithGoogle = async (): Promise<{
	success: boolean
	user: User | null
	error: AuthError | null
}> => {
	try {
		const { user } = await signInWithPopup(auth, authProvider)
		return {
			success: true,
			user,
			error: null,
		}
	} catch (error) {
		return {
			success: false,
			user: null,
			error: error as AuthError,
		}
	}
}
