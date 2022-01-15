import { User } from '@firebase/auth-types'
import { db } from 'lib/firebase'

export const createUser = async ({
	uid,
	email,
	photoURL,
	displayName: name,
}: User): Promise<{
	success: boolean
}> => {
	try {
		const res = await db.collection('users').doc(uid).get()

		if (!res.exists) {
			await db.collection('users').doc(uid).set({
				name,
				email,
				photoURL,
				is_online: true,
			})
		}

		return { success: true }
	} catch (error) {
		console.error(error)
		return {
			success: false,
		}
	}
}
