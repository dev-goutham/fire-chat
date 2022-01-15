import { db } from 'lib/firebase'

const capitalize = (str: string) =>
	str[0].toUpperCase() + str.slice(1, str.length)

export const addRoom = async (
	roomName: string,
	desc: string,
): Promise<string> => {
	db.collection('rooms')
		.where('name', '==', roomName)
		.get()
		.then((res) => {
			if (res.docs.length > 0) {
				throw new Error(`${roomName} already exists`)
			}
		})

	const id = db
		.collection('rooms')
		.add({
			name: capitalize(roomName),
			description: desc,
		})
		.then((docRef) => docRef.id)
		.catch((err) => {
			throw new Error(err)
		})

	// const q = query(ref, where('name', '==', capitalize(roomName)))

	// const r = (await getDocs(q)).size

	// if (r > 0) {
	// 	throw new Error(`${roomName} already exists`)
	// }

	// const room = await addDoc(roomsCollection, {
	// 	name: capitalize(roomName),
	// 	description: desc,
	// })

	return id
}
