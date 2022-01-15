import { db } from 'lib/firebase'
import { useEffect, useState } from 'react'

type IRoom = {
	name: string
	id: string
}

type IRooms = IRoom[]

export const useGetRooms = (): IRooms => {
	const [rooms, setRooms] = useState<IRooms>([])
	useEffect(() => {
		const unsub = db.collection('rooms').onSnapshot((snap) => {
			// const { rooms } = snap.data() as { rooms: IRooms }
			const rooms: IRoom[] = snap.docs.map(
				(doc) => ({ name: doc.data().name, id: doc.id } as unknown as IRoom),
			)
			setRooms(rooms)
		})

		return unsub
	}, [])

	return rooms
}
