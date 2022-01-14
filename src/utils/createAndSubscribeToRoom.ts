import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { firestore } from 'lib/firebase'
import { addRoom } from './addRoom'

export const createAndSubscribeToRoom = async ({
	roomName,
	uid,
}: {
	uid: string
	roomName: string
}): Promise<void> => {
	const roomId = await addRoom(roomName)

	const docRef = doc(firestore, 'users', uid)

	await updateDoc(docRef, {
		rooms: arrayUnion({
			name: roomName,
			id: roomId,
		}),
	})
}
