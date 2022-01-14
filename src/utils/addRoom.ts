import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { firestore, roomsCollection } from 'lib/firebase'

const capitalize = (str: string) =>
	str[0].toUpperCase() + str.slice(1, str.length)

export const addRoom = async (roomName: string): Promise<string> => {
	const ref = collection(firestore, 'rooms')

	const q = query(ref, where('name', '==', capitalize(roomName)))

	const r = (await getDocs(q)).size

	if (r > 0) {
		throw new Error(`${roomName} already exists`)
	}

	const room = await addDoc(roomsCollection, {
		name: capitalize(roomName),
	})

	return room.id
}
