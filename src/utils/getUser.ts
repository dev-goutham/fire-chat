import { doc, getDoc } from 'firebase/firestore'
import { firestore } from 'lib/firebase'
import { IUser } from 'store/types'

export const getUser = async (uid: string): Promise<IUser | undefined> => {
	const docRef = doc(firestore, 'users', uid)
	const docSnap = await getDoc(docRef)

	return docSnap?.data() as unknown as IUser
}
