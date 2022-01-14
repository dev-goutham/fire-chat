import { User } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { firestore } from 'lib/firebase'

export const createUser = async ({
	uid,
	email,
	photoURL,
	displayName: name,
}: User): Promise<{
	success: boolean
}> => {
	try {
		const docRef = doc(firestore, 'users', uid)

		const doesExist = (await getDoc(docRef)).exists()

		if (!doesExist) {
			await setDoc(docRef, {
				name,
				email,
				photoURL,
				rooms: [
					{
						name: 'General',
						id: 'c8K8Kr8q7WkC0373G0Mt',
					},
				],
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
