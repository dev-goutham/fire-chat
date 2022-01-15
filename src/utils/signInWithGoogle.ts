import { User, AuthError } from '@firebase/auth-types'
import { auth, GoogleProvider } from 'lib/firebase'

export const signInWithGoogle = async (): Promise<{
	success: boolean
	user: User | null
	error: AuthError | null
}> => {
	try {
		const { user } = await auth.signInWithPopup(GoogleProvider)
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
