import { db } from 'lib/firebase'
import { addRoom } from './addRoom'
import firebase from 'firebase'

export const createAndSubscribeToRoom = async ({
	roomName,
	roomDesc,
	uid,
}: {
	uid: string
	roomName: string
	roomDesc: string
}): Promise<void> => {
	const roomId = await addRoom(roomName, roomDesc)

	db.collection('users')
		.doc(uid)
		.update({
			rooms: firebase.firestore.FieldValue.arrayUnion({
				name: roomName,
				id: roomId,
			}),
		})

	// const docRef = doc(firestore, 'users', uid)

	// await updateDoc(docRef, {
	// 	rooms: arrayUnion({
	// 		name: roomName,
	// 		id: roomId,
	// 	}),
	// })
}
